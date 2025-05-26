import { createSession, getUserByEmail } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";
import { comparePassword } from "./utils";
import {
	ACCESS_TOKEN_EXPIRY_IN_MINUTES,
	REFRESH_TOKEN_EXPIRY_IN_MINUTES,
} from "@shared/constant";
import { createToken } from "@/lib/utils/jwt";
import { loginForm } from "@shared/schema";
import { AuthPayload } from "./object";

builder.mutationField("login", (t) =>
	t.field({
		type: AuthPayload,
		args: {
			email: t.arg.string({ required: true }),
			password: t.arg.string({ required: true }),
		},
		validate: {
			schema: loginForm
		},
		resolve: async (_, { email, password }, context: any) => {

			// Check if the user exists in the database
			const user = await getUserByEmail(email);
			if (!user.success) {
				throw new AppError(user.error.message, {
					code: user.error.code,
				});
			}

			// Check if user has password
			if (!user.data.password) {
				throw new AppError("Invalid Credentials", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			// Check if the password is correct
			const isPasswordValid = await comparePassword(
				password,
				user.data.password,
			);
			if (!isPasswordValid) {
				throw new AppError("Invalid Credentials", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			// Check if the email is verified
			if (!user.data.emailVerified) {
				throw new AppError("Email not verified", {
					code: ErrorCode.UNVERIFIED_EMAIL,
				});
			}

			// Create a session
			const session = await createSession({
				user: {
					connect: {
						id: user.data.id,
					},
				},
				expiresAt: new Date(
					Date.now() + REFRESH_TOKEN_EXPIRY_IN_MINUTES * 60 * 1000, // 30 days
				),
				userAgent: context.request.headers.get("user-agent"),
			});

			const accessToken = await createToken({
				payload: {
					sub: user.data.id,
				},
				expiresInMinutes: ACCESS_TOKEN_EXPIRY_IN_MINUTES,
			});

			return {
				accessToken,
				refreshToken: session.id,
			};
		},
	}),
);
