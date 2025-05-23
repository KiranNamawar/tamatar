import { updateUser } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError, ErrorCode } from "@/lib/utils/error";
import { verifyToken } from "@/lib/utils/jwt";
import { hashPassword } from "./utils";
import { resetPasswordForm } from "@shared/schema"

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
					code: ErrorCode.UNAUTHORIZED,
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
