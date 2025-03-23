import { Resend } from 'resend';
import { WelcomeEmailTemplate } from '@/components/email/templates/welcome';
import { ErrorType, Return } from '@/types/return';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (
    email: string,
    name: string,
): Promise<Return<any>> => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'welcome@tamatar.store',
            to: email,
            subject: 'Welcome to Tamatar Store',
            replyTo: 'support@tamatar.store',
            react: await WelcomeEmailTemplate({ name }),
        });

        if (error) {
            return {
                ok: false,
                error: ErrorType.internal,
                message: error.message,
            };
        }

        return { ok: true, data };
    } catch (error) {
        return { ok: false, error: ErrorType.internal, message: 'Failed to send Welcome Email' };
    }
};
