import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
	constructor(
		message: string,
		{
			code,
			metadata,
			...extensions
		}: {
			code: ErrorCode;
			metadata?: Record<string, unknown>;
			[key: string]: unknown;
		},
	) {
		super(message, {
			extensions: {
				code,
				metadata,
				...extensions,
			},
		});
		this.name = "AppError";
	}
}

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
