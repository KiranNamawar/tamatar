import { cookies } from 'next/headers'; // Utility to manage cookies in Next.js
import { ErrorType, Return } from '../../types/return'; // Types for consistent return structure
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'; // Type for cookies

/**
 * Sets authentication cookies (accessToken and refreshToken).
 * @param {string} accessToken - The access token to set in the cookies.
 * @param {string} refreshToken - The refresh token to set in the cookies.
 * @returns {Promise<Return<void>>} - A promise that resolves to a Return object indicating success or failure.
 */
export async function setAuthCookies(
    accessToken: string,
    refreshToken: string,
): Promise<Return<void>> {
    console.log('Starting setAuthCookies...');
    try {
        const cookieStore = await cookies();

        // Set the access token cookie
        cookieStore.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 15), // Expires in 15 minutes
        });
        console.log('Access token cookie set successfully.');

        // Set the refresh token cookie
        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // Expires in 30 days
        });
        console.log('Refresh token cookie set successfully.');

        return { ok: true, data: undefined };
    } catch (error) {
        console.error('Failed to set auth cookies:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to set auth cookies',
        };
    }
}

/**
 * Retrieves the access token from cookies.
 * @returns {Promise<Return<RequestCookie>>} - A promise that resolves to the access token or an error.
 */
export async function getAccessToken(): Promise<Return<RequestCookie>> {
    console.log('Starting getAccessToken...');
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (accessToken === undefined) {
            console.error('Access token is missing in cookies.');
            return {
                ok: false,
                error: ErrorType.authorization,
                message: 'Missing access token',
            };
        }
        console.log('Access token retrieved successfully.');
        return { ok: true, data: accessToken };
    } catch (error) {
        console.error('Failed to get access token:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to get access token',
        };
    }
}

/**
 * Retrieves the refresh token from cookies.
 * @returns {Promise<Return<RequestCookie>>} - A promise that resolves to the refresh token or an error.
 */
export async function getRefreshToken(): Promise<Return<RequestCookie>> {
    console.log('Starting getRefreshToken...');
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken');

        if (refreshToken === undefined) {
            console.error('Refresh token is missing in cookies.');
            return {
                ok: false,
                error: ErrorType.authorization,
                message: 'Missing refresh token',
            };
        }
        console.log('Refresh token retrieved successfully.');
        return { ok: true, data: refreshToken };
    } catch (error) {
        console.error('Failed to get refresh token:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to get refresh token',
        };
    }
}

/**
 * Retrieves both access and refresh tokens from cookies.
 * @returns {Promise<Return<{ accessToken: RequestCookie; refreshToken: RequestCookie }>>} - A promise that resolves to both tokens or an error.
 */
export async function getAuthCookies(): Promise<
    Return<{ accessToken: RequestCookie; refreshToken: RequestCookie }>
> {
    console.log('Starting getAuthCookies...');
    try {
        const accessTokenResult = await getAccessToken();
        if (!accessTokenResult.ok) {
            console.error(
                'Failed to retrieve access token:',
                accessTokenResult.message,
            );
            return accessTokenResult;
        }

        const refreshTokenResult = await getRefreshToken();
        if (!refreshTokenResult.ok) {
            console.error(
                'Failed to retrieve refresh token:',
                refreshTokenResult.message,
            );
            return refreshTokenResult;
        }

        console.log('Both access and refresh tokens retrieved successfully.');
        return {
            ok: true,
            data: {
                accessToken: accessTokenResult.data,
                refreshToken: refreshTokenResult.data,
            },
        };
    } catch (error) {
        console.error('Failed to get auth cookies:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to get auth cookies',
        };
    }
}

/**
 * Deletes authentication cookies (accessToken and refreshToken).
 * @returns {Promise<Return<void>>} - A promise that resolves to a Return object indicating success or failure.
 */
export async function deleteAuthCookies(): Promise<Return<void>> {
    console.log('Starting deleteAuthCookies...');
    try {
        const cookieStore = await cookies();

        // Delete the access token cookie
        cookieStore.delete('accessToken');
        console.log('Access token cookie deleted successfully.');

        // Delete the refresh token cookie
        cookieStore.delete('refreshToken');
        console.log('Refresh token cookie deleted successfully.');

        return { ok: true, data: undefined };
    } catch (error) {
        console.error('Failed to delete auth cookies:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to delete auth cookies',
        };
    }
}
