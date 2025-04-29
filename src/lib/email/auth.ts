import { Return } from '@/types/return';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { sendEmail } from './send';
import EmailVerificationTemplate from './templates/email-verification';

const log = logger.child({ file: 'src/lib/email/auth.ts' });

/**
 * Sends a verification email with an OTP to the user.
 * @param name - The recipient's name.
 * @param email - The recipient's email address.
 * @param otp - The one-time password for verification.
 * @returns Promise resolving to an object containing the email send result.
 */
export async function sendVerificationEmail(
    name: string,
    email: string,
    otp: string,
): Promise<Return<{ id: string }>> {
    const subject = 'Verify your email address';
    const from = 'verification@tamatar.store';

    // Log entry (do not log OTP for security)
    log.info({ email, function: 'sendVerificationEmail' }, 'Attempting to send verification email.');
    try {
        const res = await sendEmail(
            email,
            from,
            subject,
            EmailVerificationTemplate(name, otp),
        );
        if (!res.success) {
            log.error({ email, error: res.error }, 'Failed to send verification email.');
            throwAppError(
                'sendVerificationEmail',
                'Failed to send Email',
                log,
                new Error(res.error),
            );
        }
        log.info({ email, id: res.data?.id }, 'Verification email sent successfully.');
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
