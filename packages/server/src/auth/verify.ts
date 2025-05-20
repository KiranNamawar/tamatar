import { OtpPurpose } from "@/generated/prisma";
import {
	createOtp,
	createSession,
	getOtpByCodeAndUserId,
	getUserByEmail,
	updateUser,
} from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError, ErrorCode } from "@/lib/utils/error";
import { createToken, verifyToken } from "@/lib/utils/jwt";
import { z } from "zod";
import { generateOtpCode } from "./utils";
import {
	ACCESS_TOKEN_EXPIRY_IN_MINUTES,
	OTP_CODE_LENGTH,
	OTP_EXPIRATION_TIME_IN_MINUTES,
	REFRESH_TOKEN_EXPIRY_IN_MINUTES,
} from "@/lib/types/constants";
import { sendOtp } from "@/lib/email/otp";
import type { CookieListItem } from "@/lib/types/cookies";

builder.mutationField("verify", (t) =>
	t.field({
		type: "String",
		args: {
			email: t.arg.string({
				required: true,
				validate: {
					schema: z.string().trim().email("Invalid email format"),
				},
			}),
			code: t.arg.string({
				required: true,
				validate: {
					schema: z
						.string()
						.min(6, "Code must be at least 6 digits")
						.max(6, "Code must be at most 6 digits")
						.regex(/^[0-9]+$/, "Code must be a 6-digit number"),
				},
			}),
			purpose: t.arg({
				type: OtpPurpose,
				required: true,
			}),
		},
		resolve: async (_, { email, code, purpose }, context: any) => {
			const user = await getUserByEmail(email);
			if (!user.success) {
				throw new AppError(user.error.message, {
					code: user.error.code,
				});
			}

			// Verify the OTP code
			const otp = await getOtpByCodeAndUserId(code, user.data.id);
			if (!otp.success) {
				throw new AppError(otp.error.message, {
					code: otp.error.code,
				});
			}

			// Check if the OTP code is valid
			if (otp.data.expiresAt < new Date()) {
				throw new AppError("OTP code has expired", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			// Update the user to mark the email as verified
			await updateUser({ emailVerified: true }, user.data.id);

			// verify the OTP purpose
			if (otp.data.purpose !== purpose) {
				throw new AppError("Invalid OTP purpose", {
					code: ErrorCode.FORBIDDEN,
				});
			}

			if (purpose === OtpPurpose.SIGNUP || purpose === OtpPurpose.LOGIN) {
				// Create a session
				const session = await createSession({
					user: {
						connect: {
							id: user.data.id,
						},
					},
					expiresAt: new Date(
						Date.now() + REFRESH_TOKEN_EXPIRY_IN_MINUTES * 60 * 1000,
					), // 30 days
					userAgent: context.request.headers.get("user-agent"),
				});

				// Set the refresh token in the cookie
				const options: CookieListItem = {
					name: "refreshToken",
					value: session.id,
					httpOnly: true,
					sameSite: "lax",
					secure: process.env.NODE_ENV === "production",
					expires: session.expiresAt,
					path: "/",
				};
				await context.cookies.set(options);

				// Create and return access token
				return await createToken({
					payload: {
						sub: user.data.id,
					},
					expiresInMinutes: ACCESS_TOKEN_EXPIRY_IN_MINUTES, // 2 hours
				});
			}

			if (purpose === OtpPurpose.FORGOT_PASSWORD) {
				// this token is used to reset the password
				return await createToken({
					payload: {
						sub: user.data.id,
					},
					expiresInMinutes: 10, // 10 minutes
				});
			}

			return "Verification successful";
		},
	}),
);

builder.mutationField("sendOtp", (t) =>
	t.field({
		type: "Boolean",
		args: {
			email: t.arg.string({
				required: true,
				validate: {
					schema: z.string().trim().email("Invalid email format"),
				},
			}),
			purpose: t.arg({
				type: OtpPurpose,
				required: true,
			}),
		},
		resolve: async (_, { email, purpose }, context) => {
			// Check if the user already exists
			const user = await getUserByEmail(email);
			if (!user.success) {
				throw new AppError(user.error.message, {
					code: user.error.code,
				});
			}
			// generate a new OTP code
			const code = generateOtpCode(OTP_CODE_LENGTH);

			// Send the OTP email
			const mail = await sendOtp({
				name: user.data.firstName,
				email: user.data.email,
				otp: code,
			});

			// Create the OTP in the database
			const otp = await createOtp({
				user: {
					connect: {
						id: user.data.id,
					},
				},
				code,
				purpose,
				expiresAt: new Date(
					Date.now() + OTP_EXPIRATION_TIME_IN_MINUTES * 60 * 1000, // 10 minutes
				),
				mailId: mail?.id,
			});

			return true;
		},
	}),
);
