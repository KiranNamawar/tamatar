import { setAuthCookies } from '@/utils/auth/cookies'; // Utility to set authentication cookies
import { getUserInfo } from '@/utils/auth/google-auth'; // Utility to fetch user info from Google
import { getAuthToken } from '@/utils/headers'; // Utility to extract the authentication token from headers
import { getUserAgent } from '@/utils/uaparser'; // Utility to parse the user agent
import { generateAccessToken } from '@/utils/auth/jwt'; // Utility to generate JWT access tokens
import { createResponse } from '@/utils/response'; // Utility to create standardized responses
import { createUserSession } from '@/utils/auth/session'; // Utility to create user sessions
import { createUserFromGoogleInfo, getUserByEmail } from '@/utils/auth/user'; // Utilities to manage user data
import { NextRequest } from 'next/server'; // Next.js request object
import { Return } from '@/types/return'; // Return type for consistent responses
import { Prisma } from '@prisma/client'; // Prisma types
import { sendWelcomeEmail } from '@/utils/resend'; // Utility to send emails

/**
 * Handles Google login by:
 * - Fetching user info from Google
 * - Creating or retrieving the user in the database
 * - Generating access and refresh tokens
 * - Setting authentication cookies
 * - Sending a welcome email if the user is new
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<Response>} - A standardized response
 */
export async function GET(request: NextRequest) {
    console.log('Starting Google login process...');

    try {
        // Get the authentication token from the request headers
        const token = await getAuthToken();
        if (!token.ok) {
            console.error(
                'Failed to retrieve authentication token:',
                token.message,
            );
            return createResponse(null, token.error, token.message);
        }
        console.log('Authentication token retrieved successfully.');

        // Get user information from Google using the authentication token
        const userInfo = await getUserInfo(token.data);
        if (!userInfo.ok) {
            console.error(
                'Failed to fetch user info from Google:',
                userInfo.message,
            );
            return createResponse(null, userInfo.error, userInfo.message);
        }
        console.log('User info retrieved from Google:', userInfo.data);

        // Get the user agent from the request headers
        const userAgent = await getUserAgent(request);
        if (!userAgent.ok) {
            console.error('Failed to parse user agent:', userAgent.message);
            return createResponse(null, userAgent.error, userAgent.message);
        }
        console.log('User agent parsed successfully:', userAgent.data);

        let newUser: Return<
            Prisma.UserGetPayload<{ include: { profile: true } }>
        >;
        let isSignUp = false;

        // Get user details from the database using the user's email
        let user = await getUserByEmail(userInfo.data.email);
        if (!user.ok) {
            console.log(
                'User not found in the database. Proceeding with sign-up...',
            );
            // Sign up the user if they do not exist in the database
            newUser = await createUserFromGoogleInfo(userInfo.data);
            if (!newUser.ok) {
                console.error(
                    'Failed to create user in the database:',
                    newUser.message,
                );
                return createResponse(null, newUser.error, newUser.message);
            }
            user = newUser;
            isSignUp = true;
            console.log('New user created successfully:', user.data);
        } else {
            console.log('User found in the database:', user.data);
        }

        // Generate an access token for the user
        const accessToken = await generateAccessToken(
            user.data.id,
            user.data.profile?.id || '',
        );
        if (!accessToken.ok) {
            console.error(
                'Failed to generate access token:',
                accessToken.message,
            );
            return createResponse(null, accessToken.error, accessToken.message);
        }
        console.log('Access token generated successfully.');

        // Create a new user session
        const session = await createUserSession(userAgent.data, user.data.id);
        if (!session.ok) {
            console.error('Failed to create user session:', session.message);
            return createResponse(null, session.error, session.message);
        }
        console.log('User session created successfully.');

        // Set the authentication cookie with the access token and refresh token
        const authCookie = await setAuthCookies(
            accessToken.data,
            session.data.refreshToken,
        );
        if (!authCookie.ok) {
            console.error(
                'Failed to set authentication cookies:',
                authCookie.message,
            );
            return createResponse(null, authCookie.error, authCookie.message);
        }
        console.log('Authentication cookies set successfully.');

        if (isSignUp) {
            // Send a welcome email to the user
            const welcomeEmail = await sendWelcomeEmail(
                user.data.email,
                user.data.name || 'You',
            );
            if (!welcomeEmail.ok) {
                console.error(
                    'Failed to send welcome email:',
                    welcomeEmail.message,
                );
                return createResponse(
                    null,
                    welcomeEmail.error,
                    welcomeEmail.message,
                );
            }
            console.log('Welcome email sent successfully.');
        }

        // Return a successful response indicating the user has logged in
        console.log('Google login process completed successfully.');
        return createResponse(null, 200, 'User logged in successfully');
    } catch (error) {
        console.error(
            'An unexpected error occurred during Google login:',
            error,
        );
        // Return an error response in case of an exception
        return createResponse(null, 503, 'Internal server error');
    }
}
