'use server'; // Indicates that this file contains server-side actions

import { Return } from '@/types/return'; // Importing the Return type for consistent return structure
import { deleteAuthCookies, getAuthCookies } from '../utils/auth/cookies'; // Utility functions for handling authentication cookies
import { invalidateSessionByRefreshToken } from '../utils/auth/session'; // Function to invalidate a session using the refresh token

/**
 * Logs out the user by invalidating their session and deleting authentication cookies.
 * @returns {Promise<Return<void>>} - A promise that resolves to a Return object indicating success or failure.
 */
export default async function logoutAction(): Promise<Return<void>> {
    console.log('Starting logoutAction...');

    // Retrieve authentication cookies
    const authCookies = await getAuthCookies();
    if (!authCookies.ok) {
        console.error(
            'Failed to retrieve authentication cookies:',
            authCookies.message,
        );
        return {
            ok: false,
            error: authCookies.error,
            message: authCookies.message, // Return error if cookies are not found or invalid
        };
    }
    console.log('Authentication cookies retrieved successfully.');

    const { refreshToken } = authCookies.data; // Extract the refresh token from cookies
    console.log('Refresh token:', refreshToken.value);

    // Invalidate the session associated with the refresh token
    const session = await invalidateSessionByRefreshToken(refreshToken.value);
    if (!session.ok) {
        console.error('Failed to invalidate session:', session.message);
        return { ok: false, error: session.error, message: session.message }; // Return error if session invalidation fails
    }
    console.log('Session invalidated successfully.');

    // Delete authentication cookies
    const deleteCookies = await deleteAuthCookies();
    if (!deleteCookies.ok) {
        console.error(
            'Failed to delete authentication cookies:',
            deleteCookies.message,
        );
        return {
            ok: false,
            error: deleteCookies.error,
            message: deleteCookies.message, // Return error if cookie deletion fails
        };
    }
    console.log('Authentication cookies deleted successfully.');

    // Return success if all steps are completed
    console.log('Logout action completed successfully.');
    return { ok: true, data: undefined };
}

/**
 * Clears authentication cookies without invalidating the session.
 * @returns {Promise<Return<void>>} - A promise that resolves to a Return object indicating success or failure.
 */
export async function clearAuthCookiesAction(): Promise<Return<void>> {
    console.log('Starting clearAuthCookiesAction...');

    // Delete authentication cookies
    const deleteCookies = await deleteAuthCookies();
    if (!deleteCookies.ok) {
        console.error(
            'Failed to delete authentication cookies:',
            deleteCookies.message,
        );
        return {
            ok: false,
            error: deleteCookies.error,
            message: deleteCookies.message, // Return error if cookie deletion fails
        };
    }
    console.log('Authentication cookies deleted successfully.');

    // Return success if cookies are deleted
    console.log('clearAuthCookiesAction completed successfully.');
    return { ok: true, data: undefined };
}
