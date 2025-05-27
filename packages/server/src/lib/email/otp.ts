// OTP Email Utility
// Provides a function to send OTP (One-Time Password) emails using a React template and the Resend API.

import { EMAIL_DOMAIN } from "@shared/constant";
import { sendEmail } from "./resend";
import OtpVerificationEmail from "./templates/otp-verification";

/**
 * Sends an OTP email to the user for verification purposes.
 *
 * @param props.email - The recipient's email address.
 * @param props.otp - The OTP code to send.
 * @param props.name - (Optional) The recipient's name for personalization.
 * @returns The response data from Resend if successful.
 *
 * Usage:
 *   await sendOtp({ email, otp, name });
 */
export async function sendOtp(props: {
	email: string;
	otp: string;
	name?: string;
}) {
	const from = `Tamatar Store <auth@${EMAIL_DOMAIN}>`;
	const subject = "verify your email address";

	const data = await sendEmail({
		to: props.email,
		from,
		subject,
		react: OtpVerificationEmail({
			otpCode: props.otp,
			userName: props.name,
		}),
	});

	return data;
}
