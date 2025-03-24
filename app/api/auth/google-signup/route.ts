import { getUserInfo } from '@/utils/auth/google-auth';
import { getAuthToken } from '@/utils/headers';
import { createUserSession } from '@/utils/auth/session';
import { generateAccessToken } from '@/utils/auth/jwt';
import { setAuthCookies } from '@/utils/auth/cookies';
import { getUserAgent } from '@/utils/uaparser';
import { createUserFromGoogleInfo, getUserByEmail } from '@/utils/auth/user';
import { createResponse } from '@/utils/response';
import { ErrorType, Return } from '@/types/return';
import { NextRequest } from 'next/server';
import { User } from '@prisma/client';
import { sendWelcomeEmail } from '@/utils/resend';

export async function GET(request: NextRequest) {
    try {
        // Extract token from request
        const token = await getAuthToken();
        if (!token.ok) {
            return createResponse(null, token.error, token.message);
        }

        // Get user info from Google
        const userInfo = await getUserInfo(token.data);
        if (!userInfo.ok) {
            return createResponse(null, userInfo.error, userInfo.message);
        }

        let user: Return<User>;

        // Check if user already exists
        user = await getUserByEmail(userInfo.data.email);
        if (!user.ok) {
            // Create new user from Google info
            user = await createUserFromGoogleInfo(userInfo.data);
            if (!user.ok) {
                return createResponse(null, user.error, user.message);
            }
        }

        // Get user agent
        const userAgent = await getUserAgent(request);
        if (!userAgent.ok) {
            return createResponse(null, userAgent.error, userAgent.message);
        }

        // Generate access token
        const accessToken = await generateAccessToken(user.data.id);
        if (!accessToken.ok) {
            return createResponse(null, accessToken.error, accessToken.message);
        }

        // Create user session
        const session = await createUserSession(userAgent.data, user.data.id);
        if (!session.ok) {
            return createResponse(null, session.error, session.message);
        }

        // Set authentication cookies
        const authCookie = await setAuthCookies(
            accessToken.data,
            session.data.refreshToken,
        );
        if (!authCookie.ok) {
            return createResponse(null, authCookie.error, authCookie.message);
        }

        // Send welcome email
        const welcomeEmail = await sendWelcomeEmail(
            user.data.email,
            user.data.name || 'You',
        );
        if (!welcomeEmail.ok) {
            return createResponse(
                null,
                welcomeEmail.error,
                welcomeEmail.message,
            );
        }

        // Return success response
        return createResponse(null, 201, 'User created successfully');
    } catch (error) {
        console.error('Error during Google signup:', error);
        return createResponse(
            null,
            ErrorType.internal,
            'Internal server error',
        );
    }
}
