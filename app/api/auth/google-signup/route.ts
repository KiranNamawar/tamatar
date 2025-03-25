import { getUserInfo } from '@/utils/auth/google-auth'; // Utility to fetch user info from Google
import { getAuthToken } from '@/utils/headers'; // Utility to extract the authentication token from headers
import { createUserSession } from '@/utils/auth/session'; // Utility to create user sessions
import { generateAccessToken } from '@/utils/auth/jwt'; // Utility to generate JWT access tokens
import { setAuthCookies } from '@/utils/auth/cookies'; // Utility to set authentication cookies
import { getUserAgent } from '@/utils/uaparser'; // Utility to parse the user agent
import { createUserFromGoogleInfo, getUserByEmail } from '@/utils/auth/user'; // Utilities to manage user data
import { createResponse } from '@/utils/response'; // Utility to create standardized responses
import { ErrorType, Return } from '@/types/return'; // Return type for consistent responses
import { NextRequest } from 'next/server'; // Next.js request object
import { Prisma } from '@prisma/client'; // Prisma types
import { sendWelcomeEmail } from '@/utils/resend'; // Utility to send emails

/**
 * Handles Google signup by:
 * - Fetching user info from Google
 * - Creating or retrieving the user in the database
 * - Generating access and refresh tokens
 * - Setting authentication cookies
 * - Sending a welcome email
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<Response>} - A standardized response
 */
export async function GET(request: NextRequest) {
    console.log('Starting Google signup process...');

    try {
        // Extract token from request
        const token = await getAuthToken();
        if (!token.ok) {
            console.error(
                'Failed to retrieve authentication token:',
                token.message,
            );
            return createResponse(null, token.error, token.message);
        }
        console.log('Authentication token retrieved successfully.');

        // Get user info from Google
        const userInfo = await getUserInfo(token.data);
        if (!userInfo.ok) {
            console.error(
                'Failed to fetch user info from Google:',
                userInfo.message,
            );
            return createResponse(null, userInfo.error, userInfo.message);
        }
        console.log('User info retrieved from Google:', userInfo.data);

        let user: Return<Prisma.UserGetPayload<{ include: { profile: true } }>>;
        let isSignUp = false;

        // Check if user already exists
        user = await getUserByEmail(userInfo.data.email);
        if (!user.ok) {
            console.log(
                'User not found in the database. Proceeding with sign-up...',
            );
            // Create new user from Google info
            user = await createUserFromGoogleInfo(userInfo.data);
            if (!user.ok) {
                console.error(
                    'Failed to create user in the database:',
                    user.message,
                );
                return createResponse(null, user.error, user.message);
            }
            isSignUp = true;
            console.log('New user created successfully:', user.data);
        } else {
            console.log('User found in the database:', user.data);
        }

        // Get user agent
        const userAgent = await getUserAgent(request);
        if (!userAgent.ok) {
            console.error('Failed to parse user agent:', userAgent.message);
            return createResponse(null, userAgent.error, userAgent.message);
        }
        console.log('User agent parsed successfully:', userAgent.data);

        // Generate access token
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

        // Create user session
        const session = await createUserSession(userAgent.data, user.data.id);
        if (!session.ok) {
            console.error('Failed to create user session:', session.message);
            return createResponse(null, session.error, session.message);
        }
        console.log('User session created successfully.');

        // Set authentication cookies
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
            // Send welcome email
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

        // Return success response
        console.log('Google signup process completed successfully.');
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
