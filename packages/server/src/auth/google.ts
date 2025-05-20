import {
	createSession,
	createUser,
	getUserByEmail,
	getUserByGoogleId,
	updateUser,
} from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError, ErrorCode } from "@/lib/utils/error";
import { generateUsername } from "./utils";
import {
	ACCESS_TOKEN_EXPIRY_IN_MINUTES,
	REFRESH_TOKEN_EXPIRY_IN_MINUTES,
} from "@/lib/types/constants";
import type { CookieListItem } from "@/lib/types/cookies";
import { createToken } from "@/lib/utils/jwt";

builder.mutationField("google", (t) =>
	t.field({
		type: "String",
		args: {
			token: t.arg.string({ required: true }),
		},
		resolve: async (_, { token }, context: any) => {
			const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!res.ok) {
				throw new AppError("Invalid token", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			const userInfo = (await res.json()) as GoogleUserProfile;
			if (!userInfo.email_verified) {
				throw new AppError("Email not verified", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			let user = await getUserByGoogleId(userInfo.sub);
			if (!user.success) {
				user = await getUserByEmail(userInfo.email);
				if (!user.success) {
					const newUser = await createUser({
						firstName: userInfo.given_name,
						lastName: userInfo.family_name,
						email: userInfo.email,
						googleId: userInfo.sub,
						picture: userInfo.picture,
						emailVerified: userInfo.email_verified,
						username: generateUsername(userInfo.email),
					});
					user = {
						success: true,
						data: newUser,
					};
				} else {
					await updateUser(
						{
							lastName: user.data.lastName || userInfo.family_name,
							googleId: userInfo.sub,
							picture: user.data.picture || userInfo.picture,
							emailVerified: userInfo.email_verified,
						},
						user.data.id,
					);
				}
			}

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

			const options: CookieListItem = {
				name: "refreshToken",
				value: session.id,
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				expires: new Date(
					Date.now() + REFRESH_TOKEN_EXPIRY_IN_MINUTES * 60 * 1000, // 30 days
				),
			};
			await context.cookies.set(options);

			return await createToken({
				payload: {
					sub: user.data.id,
				},
				expiresInMinutes: ACCESS_TOKEN_EXPIRY_IN_MINUTES,
			});
		},
	}),
);

interface GoogleUserProfile {
	/** Google's unique identifier for the user */
	sub: string;
	/** User's full name */
	name: string;
	/** User's first name */
	given_name: string;
	/** User's last name */
	family_name: string;
	/** URL to the user's profile picture */
	picture: string;
	/** User's email address */
	email: string;
	/** Whether the email has been verified by Google */
	email_verified: boolean;
}
