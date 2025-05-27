// Email Sending Utility (Resend)
// Provides a function to send emails using the Resend API, with error handling and React email templates.

import {
	Resend,
	type CreateEmailResponse,
	type CreateEmailResponseSuccess,
} from "resend";
import { getEnvVariable } from "../utils/env";
import type React from "react";
import { AppError } from "../utils/error";
import { ErrorCode } from "@shared/constant";

const resend = new Resend(getEnvVariable("RESEND_API_KEY"));

/**
 * Sends an email using the Resend API.
 *
 * @param params.from - The sender's email address (e.g., 'App <noreply@domain.com>').
 * @param params.to - The recipient's email address.
 * @param params.subject - The email subject.
 * @param params.react - The React email template/component to render as the email body.
 * @returns The response data from Resend if successful.
 * @throws AppError if sending fails.
 *
 * Usage:
 *   await sendEmail({ from, to, subject, react: <MyEmailTemplate /> });
 */
export async function sendEmail(params: {
	from: string;
	to: string;
	subject: string;
	react: React.ReactNode;
}) {
	const { data, error } = await resend.emails.send({
		...params,
	});
	if (error) {
		throw new AppError(`[${error.name}] ${error.message}`, {
			code: ErrorCode.EMAIL_ERROR,
		});
	}
	return data;
}
