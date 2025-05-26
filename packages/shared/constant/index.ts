// General
export const FRONTEND_DOMAIN = "tamatar.store";
export const BACKEND_DOMAIN = "api.tamatar.store";
export const EMAIL_DOMAIN = "tamatar.store";
export const GRAPHQL_ENDPOINT = "https://tamatar.store/graphql";

// JWT
export const ACCESS_TOKEN_EXPIRY_IN_MINUTES = 120; // 2 hours
export const REFRESH_TOKEN_EXPIRY_IN_MINUTES = 43200; // 30 days

// OTP
export const OTP_CODE_LENGTH = 6; // 6 digits
export const OTP_EXPIRATION_TIME_IN_MINUTES = 10; // 10 minutes
export enum OtpPurpose {
	SIGNUP = "SIGNUP",
	LOGIN = "LOGIN",
	FORGOT_PASSWORD = "FORGOT_PASSWORD",
	VERIFY_EMAIL = "VERIFY_EMAIL",
}

// Error Codes
export enum ErrorCode {
	ENV_VARIABLE_NOT_SET = "ENV_VARIABLE_NOT_SET", // Missing required environment variable
	INVALID_INPUT = "INVALID_INPUT", // Input does not match expected format
	NOT_FOUND = "NOT_FOUND", // Resource not found
	CONFLICT = "CONFLICT", // Resource already exists
	UNAUTHORIZED = "UNAUTHORIZED", // Not authenticated
	FORBIDDEN = "FORBIDDEN", // Authenticated but not allowed
	INVALID_JWT = "INVALID_JWT", // JWT is invalid or expired
	UNVERIFIED_EMAIL = "UNVERIFIED_EMAIL", // Email not verified
	RATE_LIMITED = "RATE_LIMITED", // Too many requests
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR", // Unexpected server error
	DATABASE_ERROR = "DATABASE_ERROR", // Database operation failed
	EMAIL_ERROR = "EMAIL_ERROR", // Email sending failed
	UNKNOWN_ERROR = "UNKNOWN_ERROR", // Fallback for uncategorized errors
}

export type Return<T> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: {
				message: string;
				code: ErrorCode;
			};
	  };
