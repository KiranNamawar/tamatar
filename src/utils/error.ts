import { Logger } from 'pino';
import { nanoid } from 'nanoid';

/**
 * Standard error response object for API responses
 */
export interface ErrorObject {
    id: string;
    message: string;
}

/**
 * Represents the context of where an error occurred in the application.
 * This helps in tracking the error through different layers of the application.
 */
export type ErrorContext = {
    /** The name of the function where the error occurred */
    function: string;
    /** A descriptive message about what went wrong */
    message: string;
};

/**
 * Custom error class for application-specific errors.
 * Extends the native Error class to add additional context and tracking capabilities.
 */
class AppError extends Error {
    /** Unique identifier for the error instance */
    public readonly id: string;
    /** The original error message before any context was added */
    public readonly originalMessage: string;
    /** Stack of contexts where the error propagated through */
    public context: ErrorContext[];
    /** The original error that caused this error (if any) */
    public readonly cause?: Error;

    constructor(functionName: string, message: string, cause?: Error) {
        const isWrapped = cause instanceof AppError;
        const id = isWrapped ? cause.id : nanoid(6);
        const originalMessage = isWrapped ? cause.originalMessage : message;

        super(originalMessage);
        this.name = 'AppError';
        this.id = id;
        this.originalMessage = originalMessage;
        this.context = isWrapped
            ? [...cause.context, { function: functionName, message }]
            : [{ function: functionName, message }];

        this.cause = cause;
    }

    /**
     * Adds additional context to the error as it propagates through the application.
     * @param functionName - The name of the function where the error is being handled
     * @param message - Additional context about how the error is being handled
     */
    addContext(functionName: string, message: string) {
        this.context.push({ function: functionName, message });
    }

    /**
     * Converts the error to a JSON-serializable object for logging.
     * Includes the error ID, original message, and full context stack.
     */
    toJSON() {
        return {
            id: this.id,
            message: this.originalMessage,
            context: this.context,
        };
    }

    /**
     * Converts the error to a simplified object suitable for client responses.
     * Only includes the error ID and message, omitting internal context.
     */
    toErrorObject(): ErrorObject {
        return {
            id: this.id,
            message: this.originalMessage,
        };
    }
}

/**
 * Server-side error handling utilities
 */

/**
 * Creates an AppError instance with proper context and error handling.
 * @private
 */
function createAppError(
    functionName: string,
    message: string,
    err?: unknown,
): AppError {
    if (err instanceof AppError) {
        err.addContext(functionName, message);
        return err;
    }
    const baseError = err instanceof Error ? err : new Error(message);
    return new AppError(functionName, message, baseError);
}

/**
 * Creates and throws an AppError with proper context and logging.
 * Use this in server-side code (API routes, server actions) when you want to propagate errors.
 *
 * @param functionName - The name of the function where the error occurred
 * @param message - A descriptive message about what went wrong
 * @param logger - The pino logger instance for server-side logging
 * @param err - The original error (if any)
 * @throws AppError - Always throws an AppError instance
 */
/**
 * Throws a standardized application error with logging.
 * @param functionName - The function or module where the error occurred
 * @param message - Error message
 * @param logger - Logger instance
 * @param err - Original error (optional)
 * @returns never (throws)
 */
export function throwAppError(
    functionName: string,
    message: string,
    logger: Logger,
    err?: unknown,
): never {
    const appErr = createAppError(functionName, message, err);
    logger.error(appErr.toJSON(), `[${appErr.id}] Error in ${functionName}`);
    throw appErr;
}

/**
 * Creates an AppError and returns it as an ErrorObject without throwing.
 * Use this in server-side code when you want to return an error response instead of throwing.
 *
 * @param functionName - The name of the function where the error occurred
 * @param message - A descriptive message about what went wrong
 * @param logger - The pino logger instance for server-side logging
 * @param err - The original error (if any)
 * @returns ErrorObject - A simplified error object suitable for client responses
 */
/**
 * Handles an application error by logging and returning a standardized error object.
 * @param functionName
 * @param message - Error message
 * @param logger
 * @param err
 * @returns Standardized error object
 */
export function handleAppError(
    functionName: string,
    message: string,
    logger: Logger,
    err?: unknown,
): ErrorObject {
    const appErr = createAppError(functionName, message, err);
    logger.error(appErr.toJSON(), `[${appErr.id}] Error in ${functionName}`);
    return appErr.toErrorObject();
}

/**
 * Client-side error handling utilities
 */

/**
 * Creates an AppError suitable for client-side use.
 * Use this in client-side code (React components, hooks) when handling errors.
 * Logs to the console in development mode.
 *
 * @param functionName - The name of the function where the error occurred
 * @param message - A descriptive message about what went wrong
 * @param err - The original error (if any)
 * @returns ErrorObject - A simplified error object suitable for client responses
 */
export function createClientError(
    functionName: string,
    message: string,
    err?: unknown,
): ErrorObject {
    const appErr = createAppError(functionName, message, err);
    if (process.env.NODE_ENV === 'development') {
        console.error(
            `[${appErr.id}] Error in ${functionName}:`,
            appErr.toJSON(),
        );
    }
    return appErr.toErrorObject();
}
