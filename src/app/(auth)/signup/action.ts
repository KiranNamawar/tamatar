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

const log = logger.child({ file: 'src/app/(auth)/signup/action.ts' });

/**
 * Generate a random username with 6 lowercase letters
 * Used when creating new users via Google authentication
 */
const generateUsername = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);
const generateOtp = customAlphabet('0123456789', 6);

export async function signupAction(
    prev: FormActionReturn<{ context: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<{ context: string }>> {
    try {
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

        let username = email.split('@')[0];
        const isUnique = await isUsernameUnique(username);
        if (!isUnique.success) {
            log.info(
                { username },
                'Username already exists, generating a new one',
            );
            username = generateUsername();
        }

        user = await createUser({
            firstName,
            lastName,
            email,
            password,
            username,
        });

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

        await sendVerificationEmail(
            user.data?.firstName || '',
            user.data?.email || '',
            otp.data?.code || '',
        );

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
