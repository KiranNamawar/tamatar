import { cookies } from 'next/headers';
import { throwAppError } from './error';
import logger from './logger';
import { UtilityReturn } from '@/types/return';

const log = logger.child({ file: 'src/utils/cookies.ts' });

/**
 * Get a specific cookie by name
 * @param name - Name of the cookie to retrieve
 * @returns The value of the cookie or undefined if not found
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

    // Specifies the boolean value for the Secure Set-Cookie attribute.
    secure?: boolean | undefined;
}

/**
 * Set a cookie with the specified name and value
 * @param name - Name of the cookie to set
 * @param value - Value of the cookie to set
 * @param options - Options for the cookie (e.g., expires, httpOnly, secure, sameSite)
 */
export const setCookie = async (
    name: string,
    value: string,
    options?: Options,
): Promise<UtilityReturn<void>> => {
    try {
        const cookieStore = await cookies();
        cookieStore.set(name, value, options);
    } catch (error) {
        throwAppError('setCookie', 'Failed to set cookie', log, error);
    }
};

/**
 * Delete a specific cookie by name
 * @param name - Name of the cookie to delete
 */
export const deleteCookie = async (
    name: string,
): Promise<UtilityReturn<void>> => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(name);
    } catch (error) {
        throwAppError('deleteCookie', 'Failed to delete cookie', log, error);
    }
};
