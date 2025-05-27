// Session Database Utilities
// Provides functions for creating sessions and retrieving sessions by ID, with error handling and return types.

import type { Prisma, Session } from "@/generated/prisma";
import prisma from "./prisma";
import { DatabaseError } from "./error";
import type { Return } from "../types/return";
import { ErrorCode } from "@shared/constant";

/**
 * Creates a new session in the database.
 *
 * @param props - Prisma.SessionCreateInput object with session details.
 * @returns The created session object.
 * @throws DatabaseError on failure.
 */
export async function createSession(props: Prisma.SessionCreateInput) {
	try {
		return await prisma.session.create({
			data: props,
		});
	} catch (error) {
		throw new DatabaseError(error);
	}
}

/**
 * Retrieves a session by its ID, ensuring it is valid.
 *
 * @param id - The session ID.
 * @returns Return<Session> with success/data or success/error.
 */
export async function getSessionById(id: string): Promise<Return<Session>> {
	try {
		const session = await prisma.session.findUnique({
			where: {
				id,
				isValid: true,
			},
		});

		if (!session) {
			return {
				success: false,
				error: {
					message: "Session not found",
					code: ErrorCode.NOT_FOUND,
				},
			};
		}

		return {
			success: true,
			data: session,
		};
	} catch (error) {
		throw new DatabaseError(error);
	}
}

/**
 * Updates an existing session.
 *
 * @param id - The session ID.
 * @param props - Prisma.SessionUpdateInput object with updated session details.
 * @returns The updated session object.
 * @throws DatabaseError on failure.
 */
export async function updateSession(
	id: string,
	props: Prisma.SessionUpdateInput,
): Promise<Session> {
	try {
		return await prisma.session.update({
			where: {
				id,
			},
			data: props,
		});
	} catch (error) {
		throw new DatabaseError(error);
	}
}
