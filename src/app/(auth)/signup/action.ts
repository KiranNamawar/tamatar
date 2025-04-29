'use server';

import { OtpPurpose } from '@/generated/prisma';
import { FormActionReturn } from '@/types/return';
import { handleAppError } from '@/utils/error';
import { validateForm } from '@/utils/form';
import { createToken } from '@/utils/jwt';
import logger from '@/utils/logger';
import { signupSchema } from './schema';
import { customAlphabet } from 'nanoid';
import {
    createOtp,
    createUser,
    getUserByEmail,
    isUsernameUnique,
} from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import { hashPassword } from '../utils/password';

const log = logger.child({ file: 'src/app/(auth)/signup/action.ts' });

/**
 * Generate a random username with 6 lowercase letters
 * Used when creating new users via Google authentication
 */
const generateUsername = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);
const generateOtp = customAlphabet('0123456789', 6);

/**
 * Handles user signup: validates form, creates user, generates OTP, and sends verification email.
 * @param prev - Previous form action return or null.
 * @param formData - FormData containing signup fields.
 * @returns Promise resolving to success or error with context token.
 */
export async function signupAction(
    prev: FormActionReturn<{ context: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<{ context: string }>> {
    try {
        // Validate form data
        const validationResult = validateForm(formData, signupSchema);
        if (!validationResult.success) {
            log.info(
                { errors: validationResult.errors },
                'Form validation failed',
            );
            return validationResult;
        }
        const { firstName, lastName, email, password } =
            validationResult.data!;
        log.debug({ email }, 'Attempting signup');

        // Check if user already exists
        let user = await getUserByEmail(email);
        if (user.success) {
            log.info({ email }, 'Signup attempt failed: User already exists');
            return {
                success: false,
                formError: {
                    id: 'UserAlreadyExists',
                    message: 'User already exists',
                },
            };
        }

        // Ensure username uniqueness
        let username = email.split('@')[0];
        const isUnique = await isUsernameUnique(username);
        if (!isUnique.success) {
            log.info(
                { username },
                'Username already exists, generating a new one',
            );
            username = generateUsername();
        }

        // Create user in database
        user = await createUser({
            firstName,
            lastName,
            email,
            password: await hashPassword(password), 
            username,
        });

        // Generate OTP for email verification
        const otp = await createOtp({
            code: generateOtp(),
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
            user: {
                connect: {
                    id: user.data?.id,
                },
            },
            purpose: OtpPurpose.SIGNUP,
        });

        // Send verification email
        await sendVerificationEmail(
            user.data?.firstName || '',
            user.data?.email || '',
            otp.data?.code || '',
        );

        // Log successful signup and verification email
        log.info({ email, userId: user.data?.id }, 'User signed up successfully, verification email sent.');

        // Return context token for verification
        return {
            success: true,
            metadata: {
                context: await createToken(
                    {
                        userId: user.data?.id,
                        purpose: OtpPurpose.SIGNUP,
                    },
                    10,
                ),
            },
        };
    } catch (error) {
        // Handle and log errors using the custom utility
        return {
            success: false,
            formError: handleAppError(
                'signupAction',
                'Error in signup action',
                log,
                error,
            ),
        };
    }
}
