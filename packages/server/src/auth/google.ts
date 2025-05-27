// Google OAuth GraphQL Mutation Resolver
// Handles Google login/signup, user creation/update, and session/token issuance.

import {
	createSession,
	createUser,
	getUserByEmail,
	getUserByGoogleId,
	updateUser,
} from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";
import { generateUsername } from "./utils";
import {
	ACCESS_TOKEN_EXPIRY_IN_MINUTES,
	REFRESH_TOKEN_EXPIRY_IN_MINUTES,
} from "@shared/constant";
import { createToken } from "@/lib/utils/jwt";
import { AuthPayload } from "./object";

// --- Google OAuth Mutation ---
/**
 * GraphQL mutation for Google OAuth login/signup.
 *
 * - Fetches user info from Google using the provided token.
 * - Creates or updates user in the database.
 * - Issues access and refresh tokens.
 */
builder.mutationField("google", (t) =>
	t.field({
		type: AuthPayload,
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

// --- Types ---
/**
 * Google user profile returned from Google userinfo endpoint.
 */
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
