// User Database Utilities
// Provides functions for creating users and retrieving users by email, with error handling and return types.

import type { Prisma, User } from "@/generated/prisma";
import prisma from "./prisma";
import { ErrorCode } from "@shared/constant";
import { DatabaseError } from "./error";
import type { Return } from "../types/return";

/**
 * Creates a new user in the database.
 *
 * @param params - Prisma.UserCreateInput object with user details.
 * @returns The created user object.
 * @throws DatabaseError on failure.
 */
export async function createUser(params: Prisma.UserCreateInput) {
	try {
		return await prisma.user.create({
			data: params,
		});
	} catch (error) {
		throw new DatabaseError(error);
	}
}

/**
 * Retrieves a user by email address.
 *
 * @param email - The user's email address.
 * @returns Return<User> with success/data or success/error.
 */
export async function getUserByEmail(email: string): Promise<Return<User>> {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return {
				success: false,
				error: {
					message: "User not found in Database",
					code: ErrorCode.NOT_FOUND,
				},
			};
		}

		return {
			success: true,
			data: user,
		};
	} catch (error) {
		throw new DatabaseError(error);
	}
}

/**
 * Retrieves a user by Google ID.
 *
 * @param id - The user's Google ID.
 * @returns Return<User> with success/data or success/error.
 */
export async function getUserByGoogleId(id: string): Promise<Return<User>> {
	try {
		const user = await prisma.user.findUnique({
			where: { googleId: id },
		});

		if (!user) {
			return {
				success: false,
				error: {
					message: "User not found in Database",
					code: ErrorCode.NOT_FOUND,
				},
			};
		}

		return {
			success: true,
			data: user,
		};
	} catch (error) {
		throw new DatabaseError(error);
	}
}

/**
 * Updates an existing user in the database.
 *
 * @param props - Prisma.UserUpdateInput object with updated user details.
 * @param id - The ID of the user to update.
 * @returns The updated user object.
 * @throws DatabaseError on failure.
 */
export async function updateUser(props: Prisma.UserUpdateInput, id: string) {
	try {
		return await prisma.user.update({
			where: { id },
			data: props,
		});
	} catch (error) {
		throw new DatabaseError(error);
	}
}
