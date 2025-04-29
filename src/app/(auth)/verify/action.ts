'use server';

import { OtpPurpose } from '@/generated/prisma';
import {
    createOtp,
    getOtpByCodeAndUserId,
    getUserById,
    updateUser,
} from '@/lib/db';
import { FormActionReturn, Return } from '@/types/return';
import { handleAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { setupSession } from '../utils/session';
import { validateForm } from '@/utils/form';
import { otpSchema } from './schema';
import { customAlphabet } from 'nanoid';
import { sendVerificationEmail } from '@/lib/email';
import { verifyToken } from '@/utils/jwt';

const log = logger.child({ file: 'src/app/(auth)/verify/action.ts' });

const generateOtp = customAlphabet('0123456789', 6);

/**
 * Handles OTP verification for signup and password reset.
 * @param prev - Previous form action return or null.
 * @param formData - FormData containing OTP and token.
 * @returns Promise resolving to success or error, with context and redirect for password reset.
 */
export async function verifyOtpAction(
    prev: FormActionReturn<undefined | { context: string; redirect: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<undefined | { context: string; redirect: string }>> {
    try {
        // Validate form data
        const validationResult = validateForm(formData, otpSchema);
        if (!validationResult.success) {
            log.info({ errors: validationResult.errors }, 'OTP verification form validation failed');
            return validationResult;
        }
        const { code, token, userAgent } = validationResult.data!;

        // Verify token
        const { userId, purpose } = await verifyToken(token);
        log.debug({ userId, purpose }, 'OTP verification: Token verified'); 
        
        if (!userId) {
            log.info({ token }, 'OTP verification: Invalid token');
            return {
                success: false,
                errors: {
                    code: ['Invalid token'],
                },
            };
        }

        // Check OTP
        const otp = await getOtpByCodeAndUserId(code, userId);
        if (!otp.success) {
            log.info({ userId, code }, 'OTP verification: Invalid OTP code');
            return {
                success: false,
                errors: {
                    code: ['Invalid OTP code'],
                },
            };
        }

        // Mark user as verified
        const user = await updateUser(userId, {
            verifiedEmail: true,
        });
        if (!user.success) {
            log.error({ userId }, 'Failed to update user as verified');
            return {
                success: false,
                errors: {
                    code: ['Failed to update user'],
                },
            };
        }
        log.info({ userId }, 'User email verified');

        // For signup, set up session
        if (purpose === OtpPurpose.SIGNUP) {
            await setupSession(userId, userAgent);
            log.info({ userId }, 'Session created after signup verification');
        }

        // For password reset, provide context and redirect
        if (purpose === OtpPurpose.FORGOT_PASSWORD) {
            return {
                success: true,
                metadata: {
                    context: token,
                    redirect: '/reset-password',
                }
            }
        }

        return {
            success: true,
        };
    } catch (error) {
        // Handle and log errors using the custom utility
        return {
            success: false,
            errors: {
                code: [
                    handleAppError(
                        'verifyOtpAction',
                        'Failed to verify OTP',
                        log,
                        error,
                    ).message,
                ],
            },
        };
    }
}

/**
 * Handles resending OTP for verification or password reset.
 * @param token - The verification or reset token.
 * @returns Promise resolving to success or error.
 */
export async function resendOtpAction(token: string): Promise<Return<void>> {
    try {
        // Verify token
        const { userId, purpose } = await verifyToken(token);

        // Generate new OTP
        const otp = await createOtp({
            code: generateOtp(),
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
            user: {
                connect: {
                    id: userId,
                },
            },
            purpose,
        });
        if (!otp.success) {
            log.error({ userId }, 'Failed to create OTP for resend');
            return {
                success: false,
                error: 'Failed to create OTP',
            };
        }

        // Fetch user to get email
        const user = await getUserById(userId);
        if (!user.success) {
            log.error({ userId }, 'Failed to fetch user for OTP resend');
            return {
                success: false,
                error: 'Failed to fetch user',
            };
        }

        // Send verification email
        await sendVerificationEmail(
            user.data?.firstName || '',
            user.data?.email || '',
            otp.data?.code || '',
        );
        log.info({ userId }, 'Resent OTP email');

        return {
            success: true,
        };
    } catch (error) {
        // Handle and log errors using the custom utility
        return {
            success: false,
            error: handleAppError(
                'resendOtpAction',
                'Failed to resend OTP',
                log,
                error,
            ).message,
        };
    }
}
