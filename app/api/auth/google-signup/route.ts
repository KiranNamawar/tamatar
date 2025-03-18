import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken, getUserInfo } from '@/app/utils/google-auth';
import { createUserSession } from '@/app/utils/session';
import { generateAccessToken } from '@/app/utils/jwt';
import { setAuthCookie } from '@/app/utils/cookies';
import { parseUserAgent } from '@/app/utils/uaparser';
import { createUserFromGoogleInfo, getUserByEmail } from '@/app/utils/user';
import { getHeaders } from '@/app/utils/headers';
import { createResponse } from '@/app/utils/response';

export async function GET(request: NextRequest) {
    try {
        // Extract token from request
        const token = getAuthToken(request);
        if (!token.ok) {
            return createResponse(null, 401, token.message);
        }

        // Get user info from Google
        const userInfo = await getUserInfo(token.data);
        if (!userInfo.ok) {
            return createResponse(null, 503, userInfo.message);
        }

        // Check if user already exists
        const userExists = await getUserByEmail(userInfo.data.email);
        if (userExists.ok) {
            return createResponse(null, 409, 'User already exists');
        }

        // Create new user from Google info
        const user = await createUserFromGoogleInfo(userInfo.data);
        if (!user.ok) {
            return createResponse(null, 503, user.message);
        }

        // Get user agent
        const user_agent = await getHeaders('user-agent');
        if (!user_agent.ok) {
            return createResponse(null, 503, user_agent.message);
        }

        // Parse user agent
        const userAgent = parseUserAgent(user_agent.data);

        // Generate access token
        const accessToken = generateAccessToken(user.data.id);
        if (!accessToken.ok) {
            return createResponse(null, 503, accessToken.message);
        }

        // Create user session
        const session = await createUserSession(userAgent, user.data.id);
        if (!session.ok) {
            return createResponse(null, 503, session.message);
        }

        // Set authentication cookies
        const authCookie = await setAuthCookie(accessToken.data, session.data.refreshToken);
        if (!authCookie.ok) {
            return createResponse(null, 503, authCookie.message);
        }

        // Return success response
        return createResponse(null, 201, 'User created successfully');

    } catch (error) {
        console.error('Error during Google signup:', error);
        return createResponse(null, 500, 'Internal server error');
    }
}
