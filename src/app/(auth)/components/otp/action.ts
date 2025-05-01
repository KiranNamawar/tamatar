/**
 * Verification Actions for OTP-based authentication flows.
 *
 * This module provides server actions for verifying OTP codes (for signup and password reset)
 * and for resending OTP codes. It validates input, checks tokens, updates user state, and logs all events.
 *
 * Responsibilities:
 * - Validate OTP form data
 * - Verify tokens and OTP codes
 * - Update user or session state
 * - Handle error cases and provide clear error messages
 */
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
import { setupSession } from '../../utils/session';
import { validateForm } from '@/utils/form';
import { otpSchema } from './schema';
import { customAlphabet } from 'nanoid';
import { sendVerificationEmail } from '@/lib/email';
import { verifyToken } from '@/utils/jwt';
import { sendOtp } from '../../utils/otp';

const log = logger.child({ file: 'src/app/(auth)/otp/action.ts' });

/**
 * Handles OTP verification for signup and password reset.
 *
 * This function validates the OTP form data, verifies the token, checks the OTP code,
 * and updates the user state accordingly. It also handles error cases and provides clear error messages.
 *
 * @param prev - Previous form action return or null.
 * @param formData - FormData containing OTP and token.
 * @returns Promise resolving to success or error, with context and redirect for password reset.
 */
export async function verifyOtpAction(
    /**
     * Previous form action return or null.
     */
    prev: FormActionReturn<undefined | { next: string }> | null,
    /**
     * FormData containing OTP and token.
     */
    formData: FormData,
): Promise<FormActionReturn<undefined | { next: string }>> {
    try {
        // 1. Validate the OTP form data using the schema (checks code length, token presence, etc.)
        const validationResult = validateForm(formData, otpSchema);
        if (!validationResult.success) {
            // If validation fails, log and return errors to the client
            log.info(
                { errors: validationResult.errors },
                'OTP verification form validation failed',
            );
            return validationResult;
        }
        // Extract validated fields
        const { code, token, userAgent } = validationResult.data!;

        // 2. Verify the token (JWT or similar) to extract userId and purpose (SIGNUP or FORGOT_PASSWORD)
        const { userId, purpose } = await verifyToken(token);
        log.debug({ userId, purpose }, 'OTP verification: Token verified');

        if (!userId) {
            // If token is invalid, log and return error
            log.info({ token }, 'OTP verification: Invalid token');
            return {
                success: false,
                errors: {
                    code: ['Invalid token'],
                },
            };
        }

        // 3. Look up the OTP code for the user in the database
        const otp = await getOtpByCodeAndUserId(code, userId);
        if (!otp.success) {
            // If OTP is not found or invalid, return error
            log.info({ userId, code }, 'OTP verification: Invalid OTP code');
            return {
                success: false,
                errors: {
                    code: ['Invalid OTP code'],
                },
            };
        }

        // 4. Mark the user's email as verified
        const user = await updateUser(userId, {
            verifiedEmail: true,
        });
        if (!user.success) {
            // If updating user fails, log and return error
            log.error({ userId }, 'Failed to update user as verified');
            return {
                success: false,
                errors: {
                    code: ['Failed to update user'],
                },
            };
        }
        log.info({ userId }, 'User email verified');

        // 5. If this was a signup or login flow, set up a new session for the user
        if (purpose === OtpPurpose.SIGNUP || purpose === OtpPurpose.LOGIN) {
            await setupSession(userId, userAgent);
            log.info({ userId }, 'Session created after otp verification');
        }

        // 6. If this was a password reset flow, provide context and redirect for the next step
        if (purpose === OtpPurpose.FORGOT_PASSWORD) {
            return {
                success: true,
                metadata: {
                    next: 'reset',
                },
            };
        }

        // 7. If everything succeeded, return success
        return { success: true };
    } catch (error) {
        // 8. Catch any unexpected errors and return a generic error to the client
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

        // Fetch user to get email
        const user = await getUserById(userId);
        if (!user.success) {
            log.error({ userId }, 'Failed to fetch user for OTP resend');
            return {
                success: false,
                error: 'Failed to fetch user',
            };
        }

        // Send OTP email
        await sendOtp({
            userId,
            name: user.data?.firstName || '',
            purpose,
            email: user.data?.email || '',
        });

        // If everything succeeded, return success
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
