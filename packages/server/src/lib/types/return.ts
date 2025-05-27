// Return Type Utility
// Provides a generic type for function results, supporting both success and error cases with error codes.

import type { ErrorCode } from "@shared/constant";

/**
 * Return<T> is a discriminated union type for function results.
 *
 * - On success: { success: true, data: T }
 * - On error:   { success: false, error: { message: string, code: ErrorCode } }
 *
 * This enables consistent error handling and type safety across the codebase.
 *
 * Example:
 *   function foo(): Return<string> {
 *     return { success: true, data: "bar" };
 *     // or
 *     return { success: false, error: { message: "fail", code: ErrorCode.SOME_ERROR } };
 *   }
 */
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
