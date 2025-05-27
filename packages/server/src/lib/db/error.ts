// Database Error Handling Utility
// Provides a custom error class for handling and formatting database errors, especially from Prisma.

import { Prisma } from "@/generated/prisma";
import { AppError } from "../utils/error";
import { ErrorCode } from "@shared/constant";

/**
 * DatabaseError extends AppError to provide detailed error information for database operations.
 *
 * - If the error is a PrismaClientKnownRequestError, it includes the Prisma error code and metadata.
 * - Otherwise, it falls back to a generic database error with the error message.
 *
 * Usage:
 *   throw new DatabaseError(error);
 *
 * This allows for consistent error handling and formatting throughout the application,
 * and enables the client to distinguish between different types of database errors.
 *
 * Example:
 *   try {
 *     // some Prisma operation
 *   } catch (error) {
 *     throw new DatabaseError(error);
 *   }
 */
export class DatabaseError extends AppError {
	constructor(error: any) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			super(`[${error.code}] ${error.message}`, {
				code: ErrorCode.DATABASE_ERROR,
				metadata: error.meta,
			});
		} else {
			super(error.message, {
				code: ErrorCode.DATABASE_ERROR,
			});
		}
	}
}
