import { createUser, getUserByEmail } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { PASSWORD_SCHEMA } from "@/lib/types/constants";
import { AppError, ErrorCode } from "@/lib/utils/error";
import { z } from "zod";
import { generateUsername, hashPassword } from "./utils";

builder.mutationField("signup", (t) =>
	t.field({
		type: "Boolean",
		args: {
			name: t.arg.string({ required: true }),
			email: t.arg.string({ required: true }),
			password: t.arg.string({ required: true }),
			confirmPassword: t.arg.string({ required: true }),
		},
		validate: {
			schema: z
				.object({
					name: z
						.string()
						.trim()
						.min(1, "Name is required")
						.max(50, "Name is too long"),
					email: z.string().trim().email("Invalid email format"),
					password: PASSWORD_SCHEMA,
					confirmPassword: z.string().trim(),
				})
				.refine((data) => data.password === data.confirmPassword, {
					message: "Passwords do not match",
					path: ["confirmPassword"],
				}),
		},
		resolve: async (_, { name, email, password }, context: any) => {
			// Check if the user already exists
			const existingUser = await getUserByEmail(email);
			if (existingUser.success) {
				throw new AppError("User already exists", {
					code: ErrorCode.CONFLICT,
				});
			}

			const [firstName, lastName] = name.split(" ", 2);
			
			// Create the user
			const user = await createUser({
				firstName: firstName || name,
				lastName: lastName,
				email,
				password: await hashPassword(password),
				username: generateUsername(email),
			});

			return true
		},
	}),
);
