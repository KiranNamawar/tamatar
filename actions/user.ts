'use server'; // Indicates that this file contains server-side actions

import { Return } from '@/types/return'; // Importing the Return type for consistent return structure
import { deleteAuthCookies, getAccessToken } from '@/utils/auth/cookies'; // Utility functions for handling authentication cookies
import { verifyAccessToken } from '@/utils/auth/jwt'; // Utility to verify the validity of access tokens
import { deleteUserById } from '@/utils/auth/user'; // Function to delete a user by their ID

/**
 * Deletes the currently authenticated user by:
 * - Verifying the access token
 * - Deleting the user from the database
 * - Deleting authentication cookies
 * @returns {Promise<Return<void>>} - A promise that resolves to a Return object indicating success or failure.
 */
export async function deleteUserAction(): Promise<Return<void>> {
    console.log('Starting deleteUserAction...');

    // Retrieve the access token from cookies
    const accessToken = await getAccessToken();
    if (!accessToken.ok) {
        console.error('Failed to retrieve access token:', accessToken.message);
        return {
            ok: false,
            error: accessToken.error,
            message: accessToken.message,
        };
    }
    console.log('Access token retrieved successfully:', accessToken.data.value);

    // Verify the access token to extract the user ID
    const userId = await verifyAccessToken(accessToken.data.value);
    if (!userId.ok) {
        console.error('Failed to verify access token:', userId.message);
        return {
            ok: false,
            error: userId.error,
            message: userId.message,
        };
    }
    console.log(
        'Access token verified successfully. User ID:',
        userId.data.userId,
    );

    // Delete the user from the database
    const user = await deleteUserById(userId.data.userId);
    if (!user.ok) {
        console.error('Failed to delete user from database:', user.message);
        return {
            ok: false,
            error: user.error,
            message: user.message,
        };
    }
    console.log('User deleted successfully from the database.');

    // Delete authentication cookies
    const authCookies = await deleteAuthCookies();
    if (!authCookies.ok) {
        console.error(
            'Failed to delete authentication cookies:',
            authCookies.message,
        );
        return {
            ok: false,
            error: authCookies.error,
            message: authCookies.message,
        };
    }
    console.log('Authentication cookies deleted successfully.');

    // Return success if all steps are completed
    console.log('deleteUserAction completed successfully.');
    return { ok: true, data: undefined };
}
