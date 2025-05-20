import { createSession, getUserByEmail } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError, ErrorCode } from "@/lib/utils/error";
import { z } from "zod";
import { comparePassword } from "./utils";
import {
	ACCESS_TOKEN_EXPIRY_IN_MINUTES,
	REFRESH_TOKEN_EXPIRY_IN_MINUTES,
} from "@/lib/types/constants";
import { createToken } from "@/lib/utils/jwt";
import type { CookieListItem } from "@/lib/types/cookies";

builder.mutationField("login", (t) =>
	t.field({
		type: "String",
		args: {
			email: t.arg.string({ required: true }),
			password: t.arg.string({ required: true }),
		},
		validate: {
			schema: z.object({
				email: z.string().trim().email("Invalid email format"),
				password: z
					.string()
					.trim()
					.min(8, "Password must be at least 8 characters long"),
			}),
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

			// Set the refresh token in the cookie
			const options: CookieListItem = {
				name: "refreshToken",
				value: session.id,
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				expires: new Date(session.expiresAt),
			};
			await context.cookies?.set(options);

			// Create and return access token
			return await createToken({
				payload: {
					sub: user.data.id,
				},
				expiresInMinutes: ACCESS_TOKEN_EXPIRY_IN_MINUTES,
			});
		},
	}),
);
