'use server';

/**
 * Google OAuth Action Handler
 *
 * This module handles Google OAuth authentication, including fetching the Google user profile,
 * registering new users, logging in existing users, and setting up the session. All logic is modular,
 * typed, and error-handled. Logging is performed for all major events and errors.
 *
 * Responsibilities:
 * - Fetch and validate Google user profile
 * - Register new users if not found
 * - Log in existing users by Google ID or email
 * - Set up session and handle errors
 */
import {
    isUsernameUnique,
    createUser,
    getUserByEmail,
    getUserByGoogleId,
    updateUser,
} from '@/lib/db';
import { ActionReturn } from '@/types/return';
import { handleAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { customAlphabet } from 'nanoid';
import { setupSession } from '../../utils/session';

const log = logger.child({ file: 'src/app/(auth)/components/google/action.ts' });

/**
 * Generate a random username with 6 lowercase letters
 * Used when creating new users via Google authentication
 */
const generateUsername = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6);

/**
 * Represents a Google user profile returned from the OAuth authentication
 */
export interface GoogleUserProfile {
    /** Google's unique identifier for the user */
    sub: string;
    /** User's full name */
    name: string;
    /** User's first name */
    given_name: string;
    /** User's last name */
    family_name: string;
    /** URL to the user's profile picture */
    picture: string;
    /** User's email address */
    email: string;
    /** Whether the email has been verified by Google */
    email_verified: boolean;
}

/**
 * Handles Google OAuth authentication and user session setup.
 * @param token - The Google OAuth token.
 * @param userAgent - The user agent string (optional).
 * @returns An ActionReturn indicating success or failure.
 */
export async function googleAction(
    token: string,
    userAgent?: string,
): Promise<ActionReturn<void>> {
    try {
        // Start Google authentication process
        log.info('Starting Google authentication process');

        // Fetch user information from Google using the provided token
        const res = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        if (!res.ok) {
            log.error('Failed to fetch user info from Google');
            return {
                success: false,
                error: {
                    id: 'GoogleAuthError',
                    message: 'Unable to Connect to Google, please try again',
                },
            };
        }

        // Parse user information from Google response
        const userInfo = (await res.json()) as GoogleUserProfile;
        log.info({ email: userInfo.email }, 'Fetched user info from Google');

        // Check if the email is verified
        if (!userInfo.email_verified) {
            log.warn({ email: userInfo.email }, 'Email not verified by Google');
            return {
                success: false,
                error: {
                    id: 'EmailNotVerified',
                    message: 'Email not verified',
                },
            };
        }

        // Generate a username based on the email prefix or create a random one if not unique
        let username = userInfo.email.split('@')[0];
        const isUnique = await isUsernameUnique(username);
        if (!isUnique.success) {
            log.info(
                { username },
                'Username is not unique, generating a new one',
            );
            username = generateUsername();
        }

        // Check if the user exists by Google ID or email
        // Try to find the user by their Google ID (sub). This is the primary lookup for returning users.
        let user = await getUserByGoogleId(userInfo.sub);
        if (user.success) {
            // User found by Google ID: proceed to session setup.
            log.info({ email: userInfo.email }, 'User found by Google ID');
        } else {
            // No user found by Google ID. Try to find by email (for users who signed up with email/password first).
            log.info({ email: userInfo.email }, 'User not found by Google ID');
            user = await getUserByEmail(userInfo.email);
            if (user.success) {
                // User found by email: update their record to link Google ID and sync profile fields.
                log.info({ email: userInfo.email }, 'User found by email');

                // Update the user with Google ID and fill in missing details from Google profile if needed.
                user = await updateUser(user.data!.id, {
                    googleId: userInfo.sub, // Link Google account
                    firstName: user.data!.firstName || userInfo.given_name, // Prefer existing name, fallback to Google
                    lastName: user.data!.lastName || userInfo.family_name,
                    picture: user.data!.picture || userInfo.picture,
                });

                if (!user.success) {
                    // If update fails, return an error
                    log.error(
                        { email: userInfo.email },
                        'Failed to update user with Google ID',
                    );
                    return {
                        success: false,
                        error: {
                            id: 'UserUpdateError',
                            message: 'Failed to update user with Google ID',
                        },
                    };
                }

                log.info(
                    { email: userInfo.email },
                    'User updated with Google ID',
                );
            } else {
                // No user found by either Google ID or email: create a brand new user.
                log.info(
                    { email: userInfo.email },
                    'User not found, creating new user',
                );

                // Create a new user with all relevant Google profile info.
                user = await createUser({
                    email: userInfo.email,
                    googleId: userInfo.sub,
                    firstName: userInfo.given_name,
                    lastName: userInfo.family_name,
                    picture: userInfo.picture,
                    verifiedEmail: userInfo.email_verified,
                    username, // Either from email prefix or random fallback
                });

                log.info(
                    { email: userInfo.email },
                    'New user created with Google ID',
                );
            }
        }

        // At this point, user is either found or created. Set up a session so they're logged in.
        await setupSession(user.data!.id, userAgent);
        log.info(
            { userId: user.data?.id },
            'User logged in and session created successfully',
        );

        // Return success to the client (frontend will handle redirect/UI)
        return {
            success: true,
        };
    } catch (error) {
        // Catch any unexpected errors (network, DB, etc.) and return a standardized error object.
        return {
            success: false,
            error: handleAppError(
                'googleAction',
                'Failed to login with Google',
                log,
                error,
            ),
        };
    }
}
