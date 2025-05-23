import { updateSession } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError, ErrorCode } from "@/lib/utils/error";

builder.mutationField("logout", (t) =>
	t.field({
		type: "Boolean",
		resolve: async (_, args, context: any) => {
			// Check if the user is authenticated
			if (!context.refreshToken) {
				throw new AppError("User not authenticated", {
					code: ErrorCode.UNAUTHORIZED,
				});
			}

			await updateSession(context.refreshToken, {
				isValid: false,
			});

			return true;
		},
	}),
);
