// Application Error Utility
// Provides a custom error class for GraphQL and application-level errors with support for error codes and metadata.

import { GraphQLError } from "graphql";
import type { ErrorCode } from "@shared/constant";

/**
 * AppError extends GraphQLError to provide a consistent error structure for application errors.
 *
 * - Accepts a message, error code, and optional metadata or extensions.
 * - Used throughout the backend to throw errors that can be handled and formatted by GraphQL clients.
 *
 * Usage:
 *   throw new AppError("Something went wrong", { code: ErrorCode.SOME_ERROR });
 *
 * This enables the client to distinguish between different error types and handle them appropriately.
 */
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
