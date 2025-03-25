import { ErrorType, Return } from '../../types/return'; // Types for consistent return structure
import { GoogleResponse } from '../../types/google'; // Type for Google API response

/**
 * Fetches user information from Google using the provided token.
 * @param {string} token - The authorization token to fetch user info.
 * @returns {Promise<Return<any>>} - A promise that resolves to the user info or an error.
 */
export async function getUserInfo(token: string): Promise<Return<any>> {
    console.log('Starting getUserInfo with token:', token);

    try {
        const res = await fetch(
            'https://www.googleapis.com/oauth2/v1/userinfo',
            {
                headers: {
                    Authorization: token,
                },
            },
        );

        if (!res.ok) {
            console.error(
                'Failed to fetch user info from Google. Status:',
                res.status,
            );
            return {
                ok: false,
                error: ErrorType.unknown,
                message: 'Failed to fetch user info from Google',
            };
        }

        const data = await res.json();
        console.log('User info retrieved successfully from Google:', data);
        return { ok: true, data };
    } catch (error) {
        console.error(
            'Error occurred while fetching user info from Google:',
            error,
        );
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'An error occurred while fetching user info from Google',
        };
    }
}

/**
 * Sends a signup request to the Google signup API endpoint.
 * @param {GoogleResponse} response - The Google response containing token details.
 * @returns {Promise<Response>} - A promise that resolves to the API response.
 */
export async function googleSignupRequest(
    response: GoogleResponse,
): Promise<Response> {
    console.log('Starting googleSignupRequest with response:', response);

    try {
        const res = await fetch('/api/auth/google-signup', {
            method: 'GET',
            headers: {
                Authorization: `${response.token_type} ${response.access_token}`,
            },
        });

        if (!res.ok) {
            console.error(
                'Failed to send Google signup request. Status:',
                res.status,
            );
        } else {
            console.log('Google signup request sent successfully.');
        }

        return res;
    } catch (error) {
        console.error(
            'Error occurred while sending Google signup request:',
            error,
        );
        throw error;
    }
}

/**
 * Sends a login request to the Google login API endpoint.
 * @param {GoogleResponse} response - The Google response containing token details.
 * @returns {Promise<Response>} - A promise that resolves to the API response.
 */
export async function googleLoginRequest(
    response: GoogleResponse,
): Promise<Response> {
    console.log('Starting googleLoginRequest with response:', response);

    try {
        const res = await fetch('/api/auth/google-login', {
            method: 'GET',
            headers: {
                Authorization: `${response.token_type} ${response.access_token}`,
            },
        });

        if (!res.ok) {
            console.error(
                'Failed to send Google login request. Status:',
                res.status,
            );
        } else {
            console.log('Google login request sent successfully.');
        }

        return res;
    } catch (error) {
        console.error(
            'Error occurred while sending Google login request:',
            error,
        );
        throw error;
    }
}
