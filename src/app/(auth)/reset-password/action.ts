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

export async function resetPasswordAction(
    prev: FormActionReturn<void> | null,
    formData: FormData,
): Promise<FormActionReturn<void>> {
    try {
        const validationResult = validateForm(formData, resetPasswordSchema);
        if (!validationResult.success) {
            return validationResult;
        }
        const { password, token } = validationResult.data!;
        const { userId, purpose } = await verifyToken(token);
        if (!userId) {
            return {
                success: false,
                formError: {
                    id: 'Unautherized',
                    message: 'Invalid Token',
                },
            };
        }
        if (purpose === OtpPurpose.FORGOT_PASSWORD) {
            await updateUser(userId, {
                password: await hashPassword(password),
            });
        }

        return {
            success: true,
        };
    } catch (error) {
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
