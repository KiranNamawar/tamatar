import { EMAIL_DOMAIN } from "../types/constants";
import { sendEmail } from "./resend";
import OtpVerificationEmail from "./templates/otp-verification";

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
