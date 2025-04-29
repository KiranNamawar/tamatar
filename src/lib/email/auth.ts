import { Return } from '@/types/return';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { sendEmail } from './send';
import EmailVerificationTemplate from './templates/email-verification';

const log = logger.child({ file: 'src/lib/email/auth.ts' });

export async function sendVerificationEmail(
    name: string,
    email: string,
    otp: string,
): Promise<Return<{ id: string }>> {
    const subject = 'Verify your email address';
    const from = 'verification@tamatar.store';
    try {
        const res = await sendEmail(
            email,
            from,
            subject,
            EmailVerificationTemplate(name, otp),
        );
        if (!res.success) {
            throwAppError(
                'sendVerificationEmail',
                'Failed to send Email',
                log,
                new Error(res.error),
            );
        }
        return {
            success: true,
            data: res.data!,
        };
    } catch (error) {
        throwAppError(
            'sendVerificationEmail',
            'Failed to send Verification Email',
            log,
            error,
        );
    }
}
