'use server';

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
 * @param prev - Previous form action return or null.
 * @param formData - FormData containing reset password fields.
 * @returns Promise resolving to success or error.
 */
export async function resetPasswordAction(
    prev: FormActionReturn<void> | null,
    formData: FormData,
): Promise<FormActionReturn<void>> {
    try {
        // Validate form data
        const validationResult = validateForm(formData, resetPasswordSchema);
        if (!validationResult.success) {
            log.info({ errors: validationResult.errors }, 'Reset password form validation failed');
            return validationResult;
        }
        const { password, token } = validationResult.data!;

        // Verify the reset token
        const { userId, purpose } = await verifyToken(token);
        if (!userId) {
            log.info({ token }, 'Reset password: Invalid token');
            return {
                success: false,
                formError: {
                    id: 'Unautherized',
                    message: 'Invalid Token',
                },
            };
        }

        // Update password if the purpose matches
        if (purpose === OtpPurpose.FORGOT_PASSWORD) {
            await updateUser(userId, {
                password: await hashPassword(password),
            });
            log.info({ userId }, 'Password reset successfully');
        }

        return {
            success: true,
        };
    } catch (error) {
        // Handle and log errors using the custom utility
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
