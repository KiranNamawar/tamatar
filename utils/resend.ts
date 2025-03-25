import { Resend } from 'resend'; // Resend library for sending emails
import { WelcomeEmailTemplate } from '@/components/email/templates/welcome'; // Welcome email template
import { ErrorType, Return } from '@/types/return'; // Types for consistent return structure

// Initialize the Resend client with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a welcome email to the specified user.
 * @param {string} email - The recipient's email address.
 * @param {string} name - The recipient's name to personalize the email.
 * @returns {Promise<Return<any>>} - A promise that resolves to the email sending result or an error.
 */
export const sendWelcomeEmail = async (
    email: string,
    name: string,
): Promise<Return<any>> => {
    console.log('Starting sendWelcomeEmail...');
    console.log('Recipient email:', email);
    console.log('Recipient name:', name);

    try {
        // Send the email using the Resend API
        const { data, error } = await resend.emails.send({
            from: 'welcome@tamatar.store', // Sender's email address
            to: email, // Recipient's email address
            subject: 'Welcome to Tamatar Store', // Email subject
            replyTo: 'support@tamatar.store', // Reply-to email address
            react: await WelcomeEmailTemplate({ name }), // Render the email template with the recipient's name
        });

        // Check if there was an error in sending the email
        if (error) {
            console.error('Failed to send welcome email:', error.message);
            return {
                ok: false,
                error: ErrorType.internal,
                message: error.message,
            };
        }

        console.log('Welcome email sent successfully:', data);
        return { ok: true, data };
    } catch (error) {
        console.error('Error occurred while sending welcome email:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to send Welcome Email',
        };
    }
};
