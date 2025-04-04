import { Prisma, User } from '@prisma/client'; // Prisma types for database operations
import { ErrorType, Return } from '../../types/return'; // Types for consistent return structure
import prisma from '../prisma'; // Prisma client instance

/**
 * Creates a new user in the database using Google user information.
 * Also creates a profile for the user.
 * @param {any} userInfo - The user information retrieved from Google.
 * @returns {Promise<Return<Prisma.UserGetPayload<{ include: { profile: true } }>>>} - A promise that resolves to the created user with profile or an error.
 */
export async function createUserFromGoogleInfo(
    userInfo: any,
): Promise<Return<Prisma.UserGetPayload<{ include: { profile: true } }>>> {
    console.log('Starting createUserFromGoogleInfo...');
    console.log('Google user info:', userInfo);

    try {
        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture,
                verifiedEmail: userInfo.verified_email,
                googleId: userInfo.id,
            },
        });
        console.log('User created successfully:', user);

        // Create a profile for the user
        const profile = await prisma.profile.create({
            data: {
                userId: user.id,
            },
        });
        console.log('Profile created successfully:', profile);

        // Combine user and profile data
        const data = { ...user, profile };
        console.log('User with profile:', data);

        return { ok: true, data };
    } catch (error) {
        console.error('Failed to create user in database:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Failed to create user in database',
        };
    }
}

/**
 * Retrieves a user by their email address, including their profile.
 * @param {string} email - The email address of the user.
 * @returns {Promise<Return<Prisma.UserGetPayload<{ include: { profile: true } }>>>} - A promise that resolves to the user with profile or an error.
 */
export async function getUserByEmail(
    email: string,
): Promise<Return<Prisma.UserGetPayload<{ include: { profile: true } }>>> {
    console.log('Starting getUserByEmail...');
    console.log('Email:', email);

    try {
        // Find the user by email, including their profile
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                profile: true,
            },
        });

        if (!user) {
            console.error('User not found for email:', email);
            return {
                ok: false,
                error: ErrorType.notFound,
                message: 'User not found',
            };
        }

        console.log('User retrieved successfully:', user);
        return { ok: true, data: user };
    } catch (error) {
        console.error('Failed to fetch user from database:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Failed to fetch user from database',
        };
    }
}

/**
 * Deletes a user and their associated sessions from the database.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<Return<User>>} - A promise that resolves to the deleted user or an error.
 */
export async function deleteUserById(id: string): Promise<Return<User>> {
    console.log('Starting deleteUserById...');
    console.log('User ID:', id);

    try {
        // Delete all sessions associated with the user
        const userSession = await prisma.session.deleteMany({
            where: {
                userId: id,
            },
        });
        console.log('User sessions deleted successfully:', userSession);

        // Delete the user from the database
        const user = await prisma.user.delete({
            where: {
                id,
            },
        });
        console.log('User deleted successfully:', user);

        return { ok: true, data: user };
    } catch (error) {
        console.error('Failed to delete user from database:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Failed to delete user from database',
        };
    }
}


export async function createUser(user: Prisma.UserCreateInput): Promise<Return<Prisma.UserGetPayload<{ include: { profile: true}}>>> {
    console.log('Starting createUser...');
    console.log('User data:', user);

    try {
        // Create the user in the database
        const newUser = await prisma.user.create({
            data: {
                ...user,
            },
        });
        console.log('User created successfully:', newUser);

        const profile = await prisma.profile.create({
            data: {
                userId: newUser.id,
            },
        });
        console.log('Profile created successfully:', profile);

        return { ok: true, data: { ...newUser, profile } };

    } catch (error) {
        console.error('Failed to create user in database:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Failed to create user in database',
        };
    }

}