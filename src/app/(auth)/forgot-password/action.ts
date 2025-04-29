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

export async function forgotPasswordAction(
    prev: FormActionReturn<{ context: string }> | null,
    formData: FormData,
): Promise<FormActionReturn<{ context: string }>> {
    try {
        const validationResult = validateForm(
            formData,
            forgotPasswordSchema,
        );
        if (!validationResult.success) {
            return validationResult;
        }
        const { email } = validationResult.data;
        const user = await getUserByEmail(email);
        if (!user.success) {
            return {
                success: false,
                errors: {
                    email: ['Invalid email address'],
                },
            };
        }
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
                        purpose: OtpPurpose.FORGOT_PASSWORD,
                    },
                    10,
                ),
            },
        };
    } catch (error) {
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
