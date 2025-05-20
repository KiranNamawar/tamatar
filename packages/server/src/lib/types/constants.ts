import { z } from "zod";

// General
export const FRONTEND_DOMAIN = "tamatar.store";
export const BACKEND_DOMAIN = "api.tamatar.store";
export const EMAIL_DOMAIN = "tamatar.store";

// JWT
export const ACCESS_TOKEN_EXPIRY_IN_MINUTES = 120; // 2 hours
export const REFRESH_TOKEN_EXPIRY_IN_MINUTES = 43200; // 30 days

// Password
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


// OTP
export const OTP_CODE_LENGTH = 6; // 6 digits
export const OTP_EXPIRATION_TIME_IN_MINUTES = 10; // 10 minutes
