/**
 * Session database operations
 *
 * This module provides functions for interacting with the Session model in the database.
 * It uses the shared Prisma client instance and implements consistent error handling.
 */
import { prisma } from './client';
import { Session, Prisma } from '@/generated/prisma';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { Return } from '@/types/return';

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/lib/db/session.ts' });

/**
 * Get a session by its ID
 *
 * @param id - The session ID to search for
 * @returns A Return object with the session data or error information
 */
export async function getSessionById(id: string): Promise<Return<Session>> {
    try {
        const session = await prisma.session.findUnique({
            where: {
                id,
                isValid: true
             },
        });

        // Handle expected error: session not found
        if (!session) {
            log.warn({ id }, 'Session not found by ID');
            return { success: false, error: 'Session not found' };
        }

        return { success: true, data: session };
    } catch (error) {
        throwAppError(
            'getSessionById',
            `Failed to get session by ID: ${id}`,
            log,
            error,
        );
    }
}

/**
 * Get all sessions for a user
 *
 * @param userId - The user ID to get sessions for
 * @returns A Return object with the sessions data or error information
 */
export async function getSessionsByUserId(userId: string): Promise<Return<Session[]>> {
    try {
        const sessions = await prisma.session.findMany({
            where: { userId },
        });

        return { success: true, data: sessions };
    } catch (error) {
        throwAppError(
            'getSessionsByUserId',
            `Failed to get sessions for user ID: ${userId}`,
            log,
            error,
        );
    }
}

/**
 * Create a new session
 *
 * @param sessionData - The session data to create
 * @returns A Return object with the created session data or error information
 */
export async function createSession(
    sessionData: Prisma.SessionCreateInput
): Promise<Return<Session>> {
    try {
        const session = await prisma.session.create({
            data: sessionData,
        });

        log.info({ sessionId: session.id }, 'Session created successfully');
        return { success: true, data: session };
    } catch (error) {
        // Handle foreign key constraint violations
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') {
                const message = 'User not found for session creation';
                log.warn({ error, sessionData }, message);
                return { success: false, error: message };
            }
        }

        // Handle unexpected errors
        throwAppError('createSession', 'Failed to create session', log, error);
    }
}

/**
 * Update an existing session
 *
 * @param id - The ID of the session to update
 * @param sessionData - The session data to update
 * @returns A Return object with the updated session data or error information
 */
export async function updateSession(
    id: string,
    sessionData: Prisma.SessionUpdateInput,
): Promise<Return<Session>> {
    try {
        const session = await prisma.session.update({
            where: { id },
            data: sessionData,
        });

        log.info({ sessionId: id }, 'Session updated successfully');
        return { success: true, data: session };
    } catch (error) {
        // Handle record not found
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                log.warn({ error, id }, 'Session not found for update');
                return { success: false, error: 'Session not found' };
            }
        }

        // Handle unexpected errors
        throwAppError('updateSession', 'Failed to update session', log, error);
    }
}

/**
 * Delete a session by its ID
 *
 * @param id - The ID of the session to delete
 * @returns A Return object with success status or error information
 */
export async function deleteSession(id: string): Promise<Return<{ id: string }>> {
    try {
        await prisma.session.delete({
            where: { id },
        });

        log.info({ sessionId: id }, 'Session deleted successfully');
        return { success: true, data: { id } };
    } catch (error) {
        // Handle record not found
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                log.warn({ error, id }, 'Session not found for deletion');
                return { success: false, error: 'Session not found' };
            }
        }

        // Handle unexpected errors
        throwAppError('deleteSession', 'Failed to delete session', log, error);
    }
}