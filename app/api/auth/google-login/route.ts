import { setAuthCookies } from '@/utils/cookies';
import { getUserInfo } from '@/utils/google-auth';
import { getAuthToken } from '@/utils/headers';
import { getUserAgent } from '@/utils/uaparser';
import { generateAccessToken } from '@/utils/jwt';
import { createResponse } from '@/utils/response';
import { createUserSession } from '@/utils/session';
import { createUserFromGoogleInfo, getUserByEmail } from '@/utils/user';
import { NextRequest } from 'next/server';
import { Return } from '@/types/return';
import { User } from '@prisma/client';

export async function GET(request: NextRequest) {
    try {
        // Get the authentication token from the request headers
        const token = await getAuthToken();
        if (!token.ok) {
            return createResponse(null, token.error, token.message);
        }

        // Get user information from Google using the authentication token
        const userInfo = await getUserInfo(token.data);
        if (!userInfo.ok) {
            return createResponse(null, userInfo.error, userInfo.message);
        }

        // Get the user agent from the request headers
        const userAgent = await getUserAgent(request);
        if (!userAgent.ok) {
            return createResponse(null, userAgent.error, userAgent.message);
        }

        let newUser: Return<User>;

        // Get user details from the database using the user's email
        let user = await getUserByEmail(userInfo.data.email);
        if (!user.ok) {
            // Sign up the user if they do not exist in the database
            newUser = await createUserFromGoogleInfo(userInfo.data);
            if (!newUser.ok) {
                return createResponse(null, newUser.error, newUser.message);
            }
            user = newUser;
        }
     

        // Generate an access token for the user
        const accessToken = await generateAccessToken(user.data.id);
        if (!accessToken.ok) {
            return createResponse(null, accessToken.error, accessToken.message);
        }

        // Create a new user session
        const session = await createUserSession(userAgent.data, user.data.id);
        if (!session.ok) {
            return createResponse(null, session.error, session.message);
        }

        // Set the authentication cookie with the access token and refresh token
        const authCookie = await setAuthCookies(
            accessToken.data,
            session.data.refreshToken,
        );
        if (!authCookie.ok) {
            return createResponse(null, authCookie.error, authCookie.message);
        }

        // Return a successful response indicating the user has logged in
        return createResponse(null, 200, 'User logged in successfully');
    } catch (error) {
        console.error(error);
        // Return an error response in case of an exception
        return createResponse(null, 503, 'Internal server error');
    }
}
