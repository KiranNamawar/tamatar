// Signup GraphQL Mutation Resolver
// Handles user signup, checks for existing user, and creates a new user with hashed password.

import { createUser, getUserByEmail } from "@/lib/db";
import builder from "@/lib/graphql/pothos";
import { AppError } from "@/lib/utils/error";
import { ErrorCode } from "@shared/constant";
import { generateUsername, hashPassword } from "./utils";
import { signupForm } from "@shared/schema";

// --- Signup Mutation ---
/**
 * GraphQL mutation for user signup.
 *
 * - Checks if the user already exists by email.
 * - Creates a new user with hashed password and generated username.
 * - Returns true on success.
 */
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
			schema: signupForm,
		},
		resolve: async (_, { name, email, password }) => {
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

			return true;
		},
	}),
);
