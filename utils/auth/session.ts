import { Prisma, Session } from '@prisma/client'; // Prisma types for database operations
import prisma from '../prisma'; // Prisma client instance
import { ErrorType, Return } from '../../types/return'; // Types for consistent return structure

/**
 * Creates a new user session in the database.
 * @param {any} userAgent - The user agent details (browser, OS, etc.).
 * @param {string} userId - The ID of the user for whom the session is being created.
 * @returns {Promise<Return<Session>>} - A promise that resolves to the created session or an error.
 */
export async function createUserSession(
    userAgent: any,
    userId: string,
): Promise<Return<Session>> {
    console.log('Starting createUserSession...');
    console.log('User ID:', userId);
    console.log('User Agent:', userAgent);

    try {
        const session = await prisma.session.create({
            data: {
                userId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // Session expires in 30 days
                refreshToken: crypto.randomUUID(), // Generate a unique refresh token
                os: userAgent.os,
                osVersion: userAgent.osVersion,
                browser: userAgent.browser,
                browserVersion: userAgent.browserVersion,
            },
        });
        console.log('User session created successfully:', session);
        return { ok: true, data: session };
    } catch (error) {
        console.error('Failed to create user session:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Failed to create session in database',
        };
    }
}

/**
 * Invalidates a user session by marking it as revoked in the database.
 * @param {string} refreshToken - The refresh token of the session to invalidate.
 * @returns {Promise<Return<Session>>} - A promise that resolves to the invalidated session or an error.
 */
export async function invalidateSessionByRefreshToken(
    refreshToken: string,
): Promise<Return<Session>> {
    console.log('Starting invalidateSessionByRefreshToken...');
    console.log('Refresh Token:', refreshToken);

    try {
        const session = await prisma.session.update({
            where: {
                refreshToken,
            },
            data: {
                isRevoked: true, // Mark the session as revoked
                expiresAt: new Date(), // Set the expiration time to now
            },
        });
        console.log('Session invalidated successfully:', session);
        return { ok: true, data: session };
    } catch (error) {
        console.error('Failed to invalidate session:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Failed to invalidate session in database',
        };
    }
}

/**
 * Verifies a session using the provided refresh token.
 * @param {string} refreshToken - The refresh token to verify the session.
 * @returns {Promise<Return<Prisma.SessionGetPayload<{ include: { user: { include: { profile: true } } } }>>>} - A promise that resolves to the session or an error.
 */
export async function verifySession(refreshToken: string): Promise<
    Return<
        Prisma.SessionGetPayload<{
            include: { user: { include: { profile: true } } };
        }>
    >
> {
    console.log('Starting verifySession...');
    console.log('Refresh Token:', refreshToken);

    try {
        const session = await prisma.session.findFirst({
            where: {
                refreshToken,
                expiresAt: {
                    gt: new Date(), // Ensure the session has not expired
                },
                isRevoked: false, // Ensure the session is not revoked
            },
            include: {
                user: {
                    include: {
                        profile: true, // Include the user's profile in the response
                    },
                },
            },
        });

        if (!session) {
            console.error('Session is invalid or expired.');
            return {
                ok: false,
                error: ErrorType.authentication,
                message: 'Session is invalid or expired',
            };
        }

        console.log('Session verified successfully:', session);
        return { ok: true, data: session };
    } catch (error) {
        console.error('Failed to verify session:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Failed to verify session in database',
        };
    }
}
