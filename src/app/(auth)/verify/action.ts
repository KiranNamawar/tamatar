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

export async function verifyOtpAction(
    prev: FormActionReturn<undefined | { context: string; redirect: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<undefined | { context: string; redirect: string }>> {
    try {
        const validationResult = validateForm(formData, otpSchema);
        if (!validationResult.success) {
            return validationResult;
        }
        const { code, token, userAgent } = validationResult.data!;

        const { userId, purpose } = await verifyToken(token);
        if (!userId) {
            return {
                success: false,
                errors: {
                    code: ['Invalid token'],
                },
            };
        }
        const otp = await getOtpByCodeAndUserId(code, userId);
        if (!otp.success) {
            return {
                success: false,
                errors: {
                    code: ['Invalid OTP code'],
                },
            };
        }
        const user = await updateUser(userId, {
            verifiedEmail: true,
        });
        if (!user.success) {
            return {
                success: false,
                errors: {
                    code: ['Failed to update user'],
                },
            };
        }
        if (purpose === OtpPurpose.SIGNUP) {
            await setupSession(userId, userAgent);
        }

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

export async function resendOtpAction(token: string): Promise<Return<void>> {
    try {
        const { userId, purpose } = await verifyToken(token);
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
            return {
                success: false,
                error: 'Failed to create OTP',
            };
        }

        const user = await getUserById(userId);
        if (!user.success) {
            return {
                success: false,
                error: 'Failed to get user',
            };
        }

        await sendVerificationEmail(
            user.data?.firstName || '',
            user.data?.email || '',
            otp.data?.code || '',
        );

        return {
            success: true,
        };
    } catch (error) {
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
