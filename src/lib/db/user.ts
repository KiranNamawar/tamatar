/**
 * User database operations
 *
 * This module provides functions for interacting with the User model in the database.
 * It uses the shared Prisma client instance and implements consistent error handling.
 */
import { prisma } from './client';
import { User, Prisma } from '@/generated/prisma';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { Return } from '@/types/return';

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/lib/db/user.ts' });

/**
 * Get a user by their email address
 *
 * @param email - The email address to search for
 * @returns A Return object with the user data or error information
 */
export async function getUserByEmail(email: string): Promise<Return<User>> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
             },
        });

        // Handle expected error: user not found
        if (!user) {
            log.warn({ email }, 'User not found by email');
            return { success: false, error: 'User not found' };
        }

        return { success: true, data: user };
    } catch (error) {
        throwAppError(
            'getUserByEmail',
            `Failed to get user by email: ${email}`,
            log,
            error,
        );
    }
}

/**
 * Get an unverified user by their email address
 *
 * @param email - The email address to search for
 * @returns A Return object with the unverified user data or error information
 */
export async function getUnverifiedUserByEmail(
    email: string,
): Promise<Return<User>> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                verifiedEmail: false,
            },
        });
        // Handle expected error: user not found
        if (!user) {
            log.warn({ email }, 'User not found by email');
            return { success: false, error: 'User not found' };
        }
        return { success: true, data: user };
    } catch (error) {
        throwAppError(
            'getUnverifiedUserByEmail',
            `Failed to get unverified user by email: ${email}`,
            log,
            error,
        );
    }
}

/**
 * Get a user by their ID
 *
 * @param id - The user ID to search for
 * @returns A Return object with the user data or error information
 */
export async function getUserById(id: string): Promise<Return<User>> {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        // Handle expected error: user not found
        if (!user) {
            log.warn({ id }, 'User not found by ID');
            return { success: false, error: 'User not found' };
        }

        return { success: true, data: user };
    } catch (error) {
        throwAppError(
            'getUserById',
            `Failed to get user by ID: ${id}`,
            log,
            error,
        );
    }
}

/**
 * Get a user by their Google ID
 *
 * @param googleId - The Google ID to search for
 * @returns A Return object with the user data or error information
 */
export async function getUserByGoogleId(
    googleId: string,
): Promise<Return<User>> {
    try {
        const user = await prisma.user.findUnique({
            where: { googleId },
        });
        // Handle expected error: user not found
        if (!user) {
            log.warn({ googleId }, 'User not found by Google ID');
            return { success: false, error: 'User not found' };
        }
        return { success: true, data: user };
    } catch (error) {
        throwAppError(
            'getUserByGoogleId',
            `Failed to get user by Google ID: ${googleId}`,
            log,
            error,
        );
    }
}

/**
 * Create a new user
 *
 * @param userData - The user data to create
 * @returns A Return object with the created user data or error information
 */
export async function createUser(
    userData: Prisma.UserCreateInput,
): Promise<Return<User>> {
    try {
        const user = await prisma.user.create({  
            data: userData,
        });

        log.info({ userId: user.id }, 'User created successfully');
        return { success: true, data: user };
    } catch (error) {
        // Handle unique constraint violations
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const field = error.meta?.target as string[];
                const message = `User with this ${field.join(', ')} already exists`;
                log.warn({ error, userData }, message);
                return { success: false, error: message };
            }
        }

        // Handle unexpected errors
        throwAppError('createUser', 'Failed to create user', log, error);
    }
}

/**
 * Update an existing user
 *
 * @param id - The ID of the user to update
 * @param userData - The user data to update
 * @returns A Return object with the updated user data or error information
 */
export async function updateUser(
    id: string,
    userData: Prisma.UserUpdateInput,
): Promise<Return<User>> {
    try {
        const user = await prisma.user.update({
            where: { id },
            data: userData,
        });

        log.info({ userId: id }, 'User updated successfully');
        return { success: true, data: user };
    } catch (error) {
        // Handle record not found
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                log.warn({ error, id }, 'User not found for update');
                return { success: false, error: 'User not found' };
            }
        }

        // Handle unexpected errors
        throwAppError('updateUser', 'Failed to update user', log, error);
    }
}

/**
 * Delete a user by their ID
 *
 * @param id - The ID of the user to delete
 * @returns A Return object with success status or error information
 */
export async function deleteUser(id: string): Promise<Return<{ id: string }>> {
    try {
        await prisma.user.delete({
            where: { id },
        });

        log.info({ userId: id }, 'User deleted successfully');
        return { success: true, data: { id } };
    } catch (error) {
        // Handle record not found
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                log.warn({ error, id }, 'User not found for deletion');
                return { success: false, error: 'User not found' };
            }
        }

        // Handle unexpected errors
        throwAppError('deleteUser', 'Failed to delete user', log, error);
    }
}

/**
 * Check if a username is unique
 *
 * @param username - The username to check
 * @returns A Return object with success status or error information
 */
export async function isUsernameUnique(
    username: string,
): Promise<Return<void>> {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (user) {
            log.warn({ username }, 'Username already exists');
            return { success: false, error: 'Username already exists' };
        }

        return { success: true };
    } catch (error) {
        throwAppError(
            'checkIfUsernameIsUnique',
            'Failed to check username uniqueness',
            log,
            error,
        );
    }
}