'use server';

/**
 * Signup action handler for the authentication flow.
 *
 * This module handles user registration form submissions, validates credentials using a Zod schema,
 * checks for user and username uniqueness, creates the user, generates an OTP for email verification,
 * sends the verification email, and returns a context token for subsequent verification steps.
 * All errors and important events are logged using a scoped logger.
 *
 * Responsibilities:
 * - Validate incoming form data
 * - Check if user already exists
 * - Ensure username uniqueness
 * - Hash password and create user
 * - Generate OTP for email verification
 * - Send verification email
 * - Return context token for verification
 * - Return standardized error objects on failure
 */
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
 * Generate a random username with 6 lowercase letters.
 * Used when creating new users via Google authentication or when username collision occurs.
 */
const generateUsername = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);
const generateOtp = customAlphabet('0123456789', 6);

/**
 * Handles user signup: validates form, creates user, generates OTP, and sends verification email.
 *
 * @param prev - Previous form action return or null (used for progressive enhancement)
 * @param formData - FormData containing signup fields (firstName, lastName, email, password, confirmPassword, userAgent)
 * @returns Promise resolving to a FormActionReturn indicating success or detailed error, with a context token for verification
 */
export async function signupAction(
    prev: FormActionReturn<{ context: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<{ context: string }>> {
    try {
        // 1. Validate form data against the signup schema
        const validationResult = validateForm(formData, signupSchema);
        if (!validationResult.success) {
            log.info(
                { errors: validationResult.errors },
                'Form validation failed',
            );
            return validationResult;
        }
        // 2. Extract validated data
        const { firstName, lastName, email, password } =
            validationResult.data!;
        log.debug({ email }, 'Attempting signup');

        // 3. Check if user already exists by email
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

        // 4. Ensure username uniqueness (base: email prefix)
        let username = email.split('@')[0];
        const isUnique = await isUsernameUnique(username);
        if (!isUnique.success) {
            log.info(
                { username },
                'Username already exists, generating a new one',
            );
            username = generateUsername();
        }

        // 5. Create user in database (with hashed password)
        user = await createUser({
            firstName,
            lastName,
            email,
            password: await hashPassword(password), 
            username,
        });

        // 6. Generate OTP for email verification
        const otp = await createOtp({
            code: generateOtp(),
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min expiry
            user: {
                connect: {
                    id: user.data?.id,
                },
            },
            purpose: OtpPurpose.SIGNUP,
        });

        // 7. Send verification email with OTP
        await sendVerificationEmail(
            user.data?.firstName || '',
            user.data?.email || '',
            otp.data?.code || '',
        );

        // 8. Log successful signup and verification email
        log.info({ email, userId: user.data?.id }, 'User signed up successfully, verification email sent.');

        // 9. Return context token for verification
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
        // 10. Handle and log errors using the custom utility
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
