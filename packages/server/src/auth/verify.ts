import { OtpPurpose } from "@/generated/prisma";
import {
	createOtp,
	createSession,
	getOtpByCodeAndUserId,
	getUserByEmail,
	updateUser,
} from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";
import { createToken } from "@/lib/utils/jwt";
import { z } from "zod";
import { generateOtpCode } from "./utils";
import {
	ACCESS_TOKEN_EXPIRY_IN_MINUTES,
	OTP_CODE_LENGTH,
	OTP_EXPIRATION_TIME_IN_MINUTES,
	REFRESH_TOKEN_EXPIRY_IN_MINUTES,
} from "@shared/constant";
import { sendOtp } from "@/lib/email/otp";
import { AuthPayload } from "./object";
import { otpForm } from "@shared/schema";

builder.mutationField("verify", (t) =>
	t.field({
		type: AuthPayload,
		args: {
			email: t.arg.string({
				required: true,
			}),
			code: t.arg.string({
				required: true,
			}),
			purpose: t.arg({
				required: true,
				type: OtpPurpose
			}),
		},
		validate: {
			schema: otpForm
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

				// Create access token
				const accessToken = await createToken({
					payload: {
						sub: user.data.id,
					},
					expiresInMinutes: ACCESS_TOKEN_EXPIRY_IN_MINUTES, // 2 hours
				});

				return {
					accessToken,
					refreshToken: session.id,
				};
			}

			if (purpose === OtpPurpose.FORGOT_PASSWORD) {
				// this token is used to reset the password
				const resetToken = await createToken({
					payload: {
						sub: user.data.id,
					},
					expiresInMinutes: 10, // 10 minutes
				});

				return {
					accessToken: resetToken,
					refreshToken: null,
				};
			}

			return {
				accessToken: null,
				refreshToken: null,
			};
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
		resolve: async (_, { email, purpose }) => {
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
