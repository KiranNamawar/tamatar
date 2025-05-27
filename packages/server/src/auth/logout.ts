// Logout GraphQL Mutation Resolver
// Handles user logout by invalidating the refresh token/session.

import { updateSession } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";

// --- Logout Mutation ---
/**
 * GraphQL mutation for user logout.
 *
 * - Requires a valid refresh token.
 * - Invalidates the session associated with the refresh token.
 * - Returns true on success.
 */
builder.mutationField("logout", (t) =>
	t.field({
		type: "Boolean",
		args: {
			refreshToken: t.arg.string({ required: true }),
		},
		resolve: async (_, { refreshToken }) => {
			await updateSession(refreshToken, {
				isValid: false,
			});

			return true;
		},
	}),
);
