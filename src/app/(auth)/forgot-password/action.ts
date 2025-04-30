'use server';

/**
 * Forgot Password action handler for the authentication flow.
 *
 * This module handles forgot password form submissions, validates credentials using a Zod schema,
 * checks for user existence, generates an OTP for password reset, sends the verification email,
 * and returns a context token for subsequent verification steps. All errors and important events are logged.
 *
 * Responsibilities:
 * - Validate incoming form data
 * - Check if user exists
 * - Generate OTP for password reset
 * - Send verification email
 * - Return context token for verification
 * - Return standardized error objects on failure
 */
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
 *
 * @param prev - Previous form action return or null (used for progressive enhancement)
 * @param formData - FormData containing forgot password fields (email)
 * @returns Promise resolving to a FormActionReturn indicating success or detailed error, with a context token for verification
 */
export async function forgotPasswordAction(
    /**
     * Previous form action return or null (used for progressive enhancement)
     */
    prev: FormActionReturn<{ context: string }> | null,
    /**
     * FormData containing forgot password fields (email)
     */
    formData: FormData,
): Promise<FormActionReturn<{ context: string }>> {
    try {
        // 1. Validate form data against the forgot password schema
        const validationResult = validateForm(
            formData,
            forgotPasswordSchema,
        );
        if (!validationResult.success) {
            // Log and return form validation errors
            log.info({ errors: validationResult.errors }, 'Forgot password form validation failed');
            return validationResult;
        }
        // 2. Extract validated data
        const { email } = validationResult.data;

        // 3. Check if user exists
        const user = await getUserByEmail(email);
        if (!user.success) {
            // Log and return user not found error
            log.info({ email }, 'Forgot password: User not found');
            return {
                success: false,
                errors: {
                    email: ['Invalid email address'],
                },
            };
        }

        // 4. Generate OTP for password reset
        const code = generateOtp();

        // 5. Send verification email with OTP
        const mail = await sendVerificationEmail(
            user.data?.firstName || '',
            user.data?.email || '',
            code,
        );

        // 6. Create OTP in the database
        const otp = await createOtp({
            code,
            expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 min expiry
            purpose: OtpPurpose.FORGOT_PASSWORD,
            user: {
                connect: {
                    id: user.data?.id,
                },
            },
            mailId: mail.data?.id,
        });

        // 7. Log successful OTP and verification email
        log.info({ email, userId: user.data?.id }, 'Forgot password OTP generated, verification email sent.');

        // 8. Return context token for verification
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
        // 9. Handle and log errors using the custom utility
        return {
            success: false,
            formError: handleAppError(
                'forgotPasswordAction',
                'Error in forgot password action',
                log,
                error,
            ),
        };
    }
}
