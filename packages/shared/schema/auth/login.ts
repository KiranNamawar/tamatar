// Zod Schema: Login Form
// Validates user login input (email and password) for authentication flows.

import { z } from "zod";

/**
 * loginForm schema:
 * - email: must be a valid email address
 * - password: must be at least 8 characters long
 */
export const loginForm = z.object({
	email: z.string().trim().email("Invalid email format"),
	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters long"),
});
