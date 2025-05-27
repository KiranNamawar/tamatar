// Refresh Token GraphQL Mutation Resolver
// Issues a new access token using a valid refresh token/session.

import { getSessionById } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { ACCESS_TOKEN_EXPIRY_IN_MINUTES } from "@shared/constant";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";
import { createToken } from "@/lib/utils/jwt";

// --- Refresh Mutation ---
/**
 * GraphQL mutation for refreshing access tokens.
 *
 * - Requires a valid refresh token.
 * - Issues a new access token if the session is valid.
 * - Returns the new access token as a string.
 */
builder.mutationField("refresh", (t) =>
	t.field({
		type: "String",
		args: {
			refreshToken: t.arg.string({ required: true }),
		},
		resolve: async (_, { refreshToken }) => {

			// Check if the refresh token is valid
			const session = await getSessionById(refreshToken);
			if (!session.success) {
				throw new AppError("Invalid refresh token", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			return await createToken({
				payload: {
					sub: session.data.userId,
				},
				expiresInMinutes: ACCESS_TOKEN_EXPIRY_IN_MINUTES,
			});
		},
	}),
);
