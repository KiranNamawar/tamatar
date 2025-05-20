import { OtpPurpose } from "@/generated/prisma";
import { updateUser } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { PASSWORD_SCHEMA } from "@/lib/types/constants";
import { AppError, ErrorCode } from "@/lib/utils/error";
import { verifyToken } from "@/lib/utils/jwt";
import { password } from "bun";
import { z } from "zod";
import { hashPassword } from "./utils";

builder.mutationField("resetPassword", (t) =>
	t.field({
		type: "Boolean",
		args: {
			password: t.arg.string({ required: true }),
			confirmPassword: t.arg.string({ required: true }),
		},
		validate: {
			schema: z
				.object({
					password: PASSWORD_SCHEMA,
					confirmPassword: z.string().trim(),
				})
				.refine((data) => data.password === data.confirmPassword, {
					message: "Passwords do not match",
					path: ["confirmPassword"],
				}),
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
