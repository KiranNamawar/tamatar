/**
 * Email service for sending emails using Resend
 *
 * This module provides functionality to send emails with React components
 * as templates using the Resend email delivery service.
 */
import { Resend } from 'resend';
import { getEnvironmentVariable } from '@/utils/env';
import logger from '@/utils/logger';
import { ReactNode } from 'react';
import { throwAppError } from '@/utils/error';
import { Return } from '@/types/return';

/**
 * Resend client instance initialized with an API key from the environment
 * Throws an error if the API key is not set in the environment
 */
const resend = new Resend(getEnvironmentVariable('RESEND_API_KEY'));

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/lib/email/index.ts' });

/**
 * Sends an email using Resend with a React component as the email body.
 *
 * Handles communication with the Resend API, structured logging, and error handling.
 * Returns a standardized Return object on success or expected errors and throws AppError for unexpected errors.
 *
 * @param to - Recipient email address
 * @param from - Sender email address (must be verified in Resend)
 * @param subject - Email subject line
 * @param react - React component to render as the email body
 * @returns Promise<Return<{ id: string } | null>>
 * @throws AppError - For unexpected errors during email sending
 */
export const sendEmail = async (
    to: string,
    from: string,
    subject: string,
    react: ReactNode,
): Promise<Return<{ id: string } | null>> => {
    try {
        // Call Resend API to send the email
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            react,
        });

        // Handle expected errors returned by the Resend API
        if (error) {
            log.warn({ error }, `Failed to send email: ${error.message}`);
            return { success: false, error: error.message };
        }

        // Log success and return the email ID
        log.info({ data }, 'Email sent successfully');
        return { success: true, data };
    } catch (error) {
        // Handle unexpected errors (network issues, invalid parameters, etc.)
        // These will be propagated to the boundary layer for handling
        throwAppError('sendEmail', 'Failed to send email', log, error);
        // Note: This line is not reached as throwAppError throws
    }
};
