// Zod Schema: Password Validation
// Provides a reusable password validation schema for authentication flows.

import z from "zod";

/**
 * PASSWORD_SCHEMA:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one symbol
 */
export const PASSWORD_SCHEMA = z
	.string()
	.trim()
	.min(8, "Password must be at least 8 characters")
	.refine((val) => /[A-Z]/.test(val), {
		message: "Password must contain at least one uppercase letter",
	})
	.refine((val) => /[a-z]/.test(val), {
		message: "Password must contain at least one lowercase letter",
	})
	.refine((val) => /\d/.test(val), {
		message: "Password must contain at least one number",
	})
	.refine((val) => /[\W_]/.test(val), {
		message: "Password must contain at least one symbol",
	});
