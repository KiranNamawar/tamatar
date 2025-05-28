// Reset Password GraphQL Mutation Resolver
// Handles password reset using a valid access token and updates the user's password.

import { updateUser } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";
import { verifyToken } from "@/lib/utils/jwt";
import { hashPassword } from "./utils";
import { resetPasswordForm } from "@shared/schema";

// --- Reset Password Mutation ---
/**
 * GraphQL mutation for resetting user password.
 *
 * - Requires a valid access token in context.
 * - Validates new password and confirmation.
 * - Updates the user's password in the database.
 * - Returns true on success.
 */
builder.mutationField("resetPassword", (t) =>
	t.field({
		type: "Boolean",
		args: {
			password: t.arg.string({ required: true }),
			confirmPassword: t.arg.string({ required: true }),
		},
		validate: {
			schema: resetPasswordForm,
		},
		resolve: async (_, { password }, context: any) => {
			const { accessToken } = context;
			if (!accessToken) {
				throw new AppError("Email not verified", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			const res = await verifyToken(accessToken);
			if (!res.success) {
				throw new AppError("Invalid token", {
					code: res.error?.code
				});
			}

			const { sub } = res.data;

			await updateUser(
				{
					password: await hashPassword(password),
				},
				sub as string,
			);

			return true;
		},
	}),
);
