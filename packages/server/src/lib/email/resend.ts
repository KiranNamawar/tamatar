import {
	Resend,
	type CreateEmailResponse,
	type CreateEmailResponseSuccess,
} from "resend";
import { getEnvVariable } from "../utils/env";
import type React from "react";
import { AppError, ErrorCode } from "../utils/error";

const resend = new Resend(getEnvVariable("RESEND_API_KEY"));

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
