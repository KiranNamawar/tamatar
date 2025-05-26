import { updateSession } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";

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
