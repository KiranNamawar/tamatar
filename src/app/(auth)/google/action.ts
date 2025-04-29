'use server';

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
import { setupSession } from '../utils/session';

const log = logger.child({ file: 'src/app/(auth)/google/action.ts' });

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
        let user = await getUserByGoogleId(userInfo.sub);
        if (user.success) {
            log.info({ email: userInfo.email }, 'User found by Google ID');
        } else {
            log.info({ email: userInfo.email }, 'User not found by Google ID');
            user = await getUserByEmail(userInfo.email);
            if (user.success) {
                log.info({ email: userInfo.email }, 'User found by email');

                // Update the user with Google ID and other details if necessary
                user = await updateUser(user.data!.id, {
                    googleId: userInfo.sub,
                    firstName: user.data!.firstName || userInfo.given_name,
                    lastName: user.data!.lastName || userInfo.family_name,
                    picture: user.data!.picture || userInfo.picture,
                });

                if (!user.success) {
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
                log.info(
                    { email: userInfo.email },
                    'User not found, creating new user',
                );

                // Create a new user if none exists
                user = await createUser({
                    email: userInfo.email,
                    googleId: userInfo.sub,
                    firstName: userInfo.given_name,
                    lastName: userInfo.family_name,
                    picture: userInfo.picture,
                    verifiedEmail: userInfo.email_verified,
                    username,
                });

                log.info(
                    { email: userInfo.email },
                    'New user created with Google ID',
                );
            }
        }

        // Set up a session for the user
        await setupSession(user.data!.id, userAgent);
        log.info({ email: userInfo.email }, 'Session created successfully');

        log.info({ userId: user.data?.id }, 'User logged in successfully');
        return {
            success: true,
        };
    } catch (error) {
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
