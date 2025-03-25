import { ErrorType } from '@/types/return'; // Enum for error types
import { generateAccessToken } from '@/utils/auth/jwt'; // Utility to generate JWT access tokens
import { createJsonResponse, createResponse } from '@/utils/response'; // Utilities to create standardized responses
import { verifySession } from '@/utils/auth/session'; // Utility to verify user sessions
import { NextRequest } from 'next/server'; // Next.js request object

/**
 * Handles refreshing the access token by:
 * - Validating the provided refresh token
 * - Verifying the session associated with the refresh token
 * - Generating a new access token
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<Response>} - A standardized response
 */
export async function POST(request: NextRequest) {
    console.log('Starting refresh token process...');

    try {
        // Parse the request body to extract the refresh token
        const { refreshToken } = await request.json();
        if (!refreshToken) {
            console.error('Missing refresh token in the request body.');
            return createResponse(
                null,
                ErrorType.validation,
                'Missing refresh token',
            );
        }
        console.log('Refresh token received:', refreshToken);

        // Verify the session associated with the refresh token
        const session = await verifySession(refreshToken);
        if (!session.ok) {
            console.error('Failed to verify session:', session.message);
            return createResponse(null, session.error, session.message);
        }
        console.log(
            'Session verified successfully. User ID:',
            session.data.userId,
        );

        // Generate a new access token for the user
        const accessToken = await generateAccessToken(
            session.data.userId,
            session.data.user.profile?.id || '',
        );
        if (!accessToken.ok) {
            console.error(
                'Failed to generate access token:',
                accessToken.message,
            );
            return createResponse(null, accessToken.error, accessToken.message);
        }
        console.log('Access token generated successfully.');

        // Return the new access token in the response
        const token = accessToken.data;
        console.log('Returning refreshed access token.');
        return createJsonResponse(
            { accessToken: token },
            200,
            'Successfully refreshed access token',
        );
    } catch (error) {
        console.error(
            'An unexpected error occurred during token refresh:',
            error,
        );
        return createResponse(
            null,
            ErrorType.internal,
            'Failed to refresh access token',
        );
    }
}
