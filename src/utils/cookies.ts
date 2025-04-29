import { cookies } from 'next/headers';
import { throwAppError } from './error';
import logger from './logger';
import { UtilityReturn } from '@/types/return';

// Logger instance for this utility file
const log = logger.child({ file: 'src/utils/cookies.ts' });

/**
 * Retrieves the value of a specific cookie by name.
 *
 * @param name - Name of the cookie to retrieve
 * @returns Promise resolving to the cookie value or undefined if not found
 * @throws AppError if cookie retrieval fails
 */
export const getCookie = async (
    name: string,
): Promise<UtilityReturn<string | undefined>> => {
    try {
        const cookieStore = await cookies();
        return cookieStore.get(name)?.value;
    } catch (error) {
        throwAppError('getCookie', 'Failed to get cookie', log, error);
    }
};

/**
 * Options for setting a cookie. Mirrors the Set-Cookie attributes.
 */
interface Options {
    // Specifies the value for the Domain Set-Cookie attribute.
    domain?: string | undefined;

    // Specifies a function to encode a cookie's value.
    encode?(value: string): string;

    // Specifies the Date object for the Expires Set-Cookie attribute.
    expires?: Date | undefined;

    // Specifies the boolean value for the HttpOnly Set-Cookie attribute.
    httpOnly?: boolean | undefined;

    // Specifies the number (in seconds) for the Max-Age Set-Cookie attribute.
    maxAge?: number | undefined;

    // Specifies the boolean value for the Partitioned Set-Cookie attribute.
    partitioned?: boolean | undefined;

    // Specifies the value for the Path Set-Cookie attribute.
    path?: string | undefined;

    // Specifies the string value for the Priority Set-Cookie attribute.
    priority?: 'low' | 'medium' | 'high' | undefined;

    // Specifies the value for the SameSite Set-Cookie attribute.
    sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;

    /**
     * Specifies the boolean value for the Secure Set-Cookie attribute.
     */
    secure?: boolean | undefined;
}

/**
 * Sets a cookie with the specified name, value, and options.
 *
 * @param name - Name of the cookie to set
 * @param value - Value of the cookie to set
 * @param options - Additional options for the cookie (domain, expires, httpOnly, etc.)
 * @returns Promise resolving when the cookie is set
 * @throws AppError if setting the cookie fails
 */
export const setCookie = async (
    name: string,
    value: string,
    options?: Options,
): Promise<UtilityReturn<void>> => {
    try {
        const cookieStore = await cookies();
        cookieStore.set({ name, value, ...options });
    } catch (error) {
        throwAppError('setCookie', 'Failed to set cookie', log, error);
    }
};

/**
 * Deletes a specific cookie by name.
 *
 * @param name - Name of the cookie to delete
 * @returns Promise resolving when the cookie is deleted
 * @throws AppError if deletion fails
 */
export const deleteCookie = async (
    name: string,
): Promise<UtilityReturn<void>> => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(name);
        log.info(`Cookie ${name} deleted successfully`);
    } catch (error) {
        throwAppError('deleteCookie', 'Failed to delete cookie', log, error);
    }
};
