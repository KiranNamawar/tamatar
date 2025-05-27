// Environment Variable Utility
// Provides a function to safely retrieve environment variables with error handling.

import { AppError } from "./error";
import { ErrorCode } from "@shared/constant";

/**
 * Retrieves the value of an environment variable by key.
 * Throws an AppError if the variable is not set.
 *
 * @param key - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws AppError if the variable is not set.
 *
 * Usage:
 *   const secret = getEnvVariable("JWT_SECRET");
 */
export function getEnvVariable(key: string) {
	const value = process.env[key];
	if (!value) {
		throw new AppError(`Environment variable [${key}] is not set`, {
			code: ErrorCode.ENV_VARIABLE_NOT_SET,
		});
	}
	return value;
}
