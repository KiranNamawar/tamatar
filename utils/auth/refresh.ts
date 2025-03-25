import { NextRequest } from 'next/server'; // Next.js request object
import { Return, ErrorType } from '../../types/return'; // Types for consistent return structure

/**
 * Refreshes the access token using the provided refresh token.
 * @param {string} refreshToken - The refresh token to use for refreshing the access token.
 * @param {NextRequest} request - The incoming request object to determine the origin.
 * @returns {Promise<Return<string>>} - A promise that resolves to the new access token or an error.
 */
export async function refreshAccessToken(
    refreshToken: string,
    request: NextRequest,
): Promise<Return<string>> {
    console.log('Starting refreshAccessToken...');
    console.log('Refresh token:', refreshToken);

    try {
        // Send a POST request to the refresh API endpoint
        const response = await fetch(
            `${request.nextUrl.origin}/api/auth/refresh`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            },
        );

        if (response.ok) {
            const data = await response.json();
            console.log(
                'Access token refreshed successfully:',
                data.accessToken,
            );
            return { ok: true, data: data.accessToken };
        } else {
            const errorMessage = await response.text();
            console.error(
                'Failed to refresh access token. Status:',
                response.status,
                'Message:',
                errorMessage,
            );
            return {
                ok: false,
                error: ErrorType.validation,
                message: 'Failed to refresh access token',
            };
        }
    } catch (error) {
        console.error('Error occurred while refreshing access token:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'An error occurred while refreshing access token',
        };
    }
}
