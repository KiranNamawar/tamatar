// Zod Schema: Reset Password Form
// Validates input for resetting a user's password (new password and confirmation).

import { z } from "zod";
import { PASSWORD_SCHEMA } from "./password";

/**
 * resetPasswordForm schema:
 * - password: must match PASSWORD_SCHEMA
 * - confirmPassword: must match password
 */
export const resetPasswordForm = z
	.object({
		password: PASSWORD_SCHEMA,
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
