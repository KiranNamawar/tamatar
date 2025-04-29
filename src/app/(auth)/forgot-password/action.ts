'use server';

import { FormActionReturn } from '@/types/return';
import { handleAppError } from '@/utils/error';
import { validateForm } from '@/utils/form';
import logger from '@/utils/logger';
import { forgotPasswordSchema } from './schema';
import { sendVerificationEmail } from '@/lib/email';
import { createOtp, getUserByEmail } from '@/lib/db';
import { customAlphabet } from 'nanoid';
import { OtpPurpose } from '@/generated/prisma';
import { createToken } from '@/utils/jwt';

const log = logger.child({ file: 'src/app/(auth)/forgot-password/action.ts' });

const generateOtp = customAlphabet('0123456789', 6);

/**
 * Handles forgot password: validates form, checks user, creates OTP, and sends verification email.
 * @param prev - Previous form action return or null.
 * @param formData - FormData containing forgot password fields.
 * @returns Promise resolving to success or error with context token.
 */
export async function forgotPasswordAction(
    prev: FormActionReturn<{ context: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<{ context: string }>> {
    try {
        // Validate form data
        const validationResult = validateForm(
            formData,
            forgotPasswordSchema,
        );
        if (!validationResult.success) {
            log.info({ errors: validationResult.errors }, 'Forgot password form validation failed');
            return validationResult;
        }
        const { email } = validationResult.data;

        // Check if user exists
        const user = await getUserByEmail(email);
        if (!user.success) {
            log.info({ email }, 'Forgot password: User not found');
            return {
                success: false,
                errors: {
                    email: ['Invalid email address'],
                },
            };
        }

        // Generate OTP for password reset
        const otp = await createOtp({
            code: generateOtp(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
            purpose: OtpPurpose.FORGOT_PASSWORD,
            user: {
                connect: {
                    id: user.data?.id,
                },
            },
        });

        // Send verification email
        await sendVerificationEmail(
            user.data?.firstName || '',
            user.data?.email || '',
            otp.data?.code || '',
        );
        log.info({ email }, 'Forgot password OTP and email sent');

        // Return context token for verification
        return {
            success: true,
            metadata: {
                context: await createToken(
                    {
                        userId: user.data?.id,
                        purpose: OtpPurpose.FORGOT_PASSWORD,
                    },
                    10,
                ),
            },
        };
    } catch (error) {
        // Handle and log errors using the custom utility
        return {
            success: false,
            errors: {
                email: [
                    handleAppError(
                        'forgotPassword',
                        'Failed to send forgotPassword email',
                        log,
                        error,
                    ).message,
                ],
            },
        };
    }
}
