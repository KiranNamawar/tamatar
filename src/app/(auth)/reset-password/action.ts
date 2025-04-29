'use server';

/**
 * Reset Password action handler for the authentication flow.
 *
 * This module handles password reset form submissions, validates credentials using a Zod schema,
 * verifies the reset token, updates the user's password (after hashing), and logs all events.
 *
 * Responsibilities:
 * - Validate incoming form data
 * - Verify reset token
 * - Hash and update the user's password
 * - Return standardized error objects on failure
 */
import { FormActionReturn } from '@/types/return';
import { handleAppError } from '@/utils/error';
import { validateForm } from '@/utils/form';
import logger from '@/utils/logger';
import { resetPasswordSchema } from './schema';
import { verifyToken } from '@/utils/jwt';
import { updateUser } from '@/lib/db';
import { hashPassword } from '../utils/password';
import { OtpPurpose } from '@/generated/prisma';

const log = logger.child({ file: 'src/app/(auth)/reset-password/action.ts' });

/**
 * Handles password reset: validates form, verifies token, updates password.
 *
 * @param prev - Previous form action return or null (used for progressive enhancement)
 * @param formData - FormData containing reset password fields (password, confirmPassword, token)
 * @returns Promise resolving to a FormActionReturn indicating success or detailed error
 */
export async function resetPasswordAction(
    prev: FormActionReturn<void> | null,
    formData: FormData,
): Promise<FormActionReturn<void>> {
    try {
        // 1. Validate form data against the reset password schema
        const validationResult = validateForm(formData, resetPasswordSchema);
        if (!validationResult.success) {
            // Log and return form validation errors
            log.info({ errors: validationResult.errors }, 'Reset password form validation failed');
            return validationResult;
        }
        // 2. Extract validated data
        const { password, token } = validationResult.data!;

        // 3. Verify the reset token
        const { userId, purpose } = await verifyToken(token);
        if (!userId) {
            // Log and return invalid token error
            log.info({ token }, 'Reset password: Invalid token');
            return {
                success: false,
                formError: {
                    id: 'Unautherized',
                    message: 'Invalid Token',
                },
            };
        }

        // 4. Update password if the purpose matches
        if (purpose === OtpPurpose.FORGOT_PASSWORD) {
            await updateUser(userId, {
                password: await hashPassword(password),
            });
            log.info({ userId }, 'Password reset successfully');
        }

        // 5. Return success
        return {
            success: true,
        };
    } catch (error) {
        // 6. Handle and log errors using the custom utility
        return {
            success: false,
            formError: handleAppError(
                'resetPasswordAction',
                'Failed to reset password',
                log,
                error,
            ),
        };
    }
}
