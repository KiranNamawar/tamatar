/**
 * Refresh Token Route
 *
 * This API route handles refreshing the user's access token using a valid refresh token.
 * It validates the incoming refresh token, fetches the corresponding session, generates a new access token,
 * sets the updated authentication cookies, and returns a success or error response.
 *
 * Responsibilities:
 * - Validate and parse the refresh token from the request body
 * - Fetch the session by refresh token
 * - Generate a new access token for the user
 * - Set new authentication cookies
 * - Handle and log errors, returning appropriate HTTP status codes and messages
 */
import { getSessionById } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { generateAccessToken } from '../utils/jwt';
import { setAuthCookies } from '../utils/cookies';
import { handleAppError } from '@/utils/error';
import logger from '@/utils/logger';

const log = logger.child({ file: 'src/app/(auth)/refresh/route.ts' });

/**
 * POST /refresh
 *
 * Handles refresh token requests. Validates the refresh token, generates a new access token,
 * updates cookies, and returns a JSON response indicating success or error.
 *
 * @param request - NextRequest containing the refresh token in the body
 * @returns NextResponse with status and message
 */
export async function POST(request: NextRequest) {
    try {
        const { refreshToken } = await request.json();
        if (!refreshToken) {
            return NextResponse.json(
                { message: 'Refresh token is required' },
                { status: 400 },
            );
        }
        const session = await getSessionById(refreshToken);
        if (!session.success) {
            return NextResponse.json(
                { message: 'Session not found' },
                { status: 404 },
            );
        }
        const accessToken = await generateAccessToken(session.data!.userId);

        await setAuthCookies(accessToken, refreshToken);
        return NextResponse.json(
            { message: 'Refresh Successful' },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            handleAppError(
                'Route: /refresh',
                'Failed to refresh Access Token',
                log,
                error,
            ),
            { status: 500 },
        );
    }
}
