import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken, getUserInfo } from '@/app/utils/google-auth';
import { createUserSession } from '@/app/utils/session';
import { generateAccessToken } from '@/app/utils/jwt';
import { setAuthCookie } from '@/app/utils/cookies';
import { parseUserAgent } from '@/app/utils/uaparser';
import { createUserFromGoogleInfo, getUserByEmail } from '@/app/utils/user';
import { getHeaders } from '@/app/utils/headers';

export async function GET(request: NextRequest) {
    try {
        // Extract token from request
        const token = getAuthToken(request);
        if (!token.ok) {
            return new NextResponse(null, {
                status: 401,
                headers: { 'X-Message': token.message },
            });
        }

        // Get user info from Google
        const userInfo = await getUserInfo(token.data);
        if (!userInfo.ok) {
            return new NextResponse(null, {
                status: 503,
                headers: { 'X-Message': userInfo.message },
            });
        }

        // Check if user already exists
        const userExists = await getUserByEmail(userInfo.data.email);
        if (userExists.ok) {
            return new NextResponse(null, {
                status: 409,
                headers: { 'X-Message': 'User already exists' },
            });
        }

        // Create new user from Google info
        const user = await createUserFromGoogleInfo(userInfo.data);
        if (!user.ok) {
            return new NextResponse(null, {
                status: 503,
                headers: { 'X-Message': user.message },
            });
        }

        // Get user agent
        const user_agent = await getHeaders('user-agent');
        if (!user_agent.ok) {
            return new NextResponse(null, {
                status: 503,
                headers: { 'X-Message': user_agent.message },
            });
        }

        // Parse user agent
        const userAgent = parseUserAgent(user_agent.data);

        // Generate access token
        const accessToken = generateAccessToken(user.data.id);
        if (!accessToken.ok) {
            return new NextResponse(null, {
                status: 500,
                headers: { 'X-Message': accessToken.message },
            });
        }

        // Create user session
        const session = await createUserSession(userAgent, user.data.id);
        if (!session.ok) {
            return new NextResponse(null, {
                status: 503,
                headers: { 'X-Message': session.message },
            });
        }

        // Set authentication cookies
        const authCookie = await setAuthCookie(accessToken.data, session.data.refreshToken);
        if (!authCookie.ok) {
            return new NextResponse(null, {
                status: 503,
                headers: { 'X-Message': authCookie.message },
            });
        }

        // Return success response
        return new NextResponse(null, {
            status: 201,
            headers: { 'X-Message': 'User created successfully' },
        });

    } catch (error) {
        console.error('Error during Google signup:', error);
        return new NextResponse(null, {
            status: 500,
            headers: { 'X-Message': 'Internal Server Error' },
        });
    }
}
