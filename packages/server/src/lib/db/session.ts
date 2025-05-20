import type { Prisma, Session } from "@/generated/prisma";
import prisma from "./prisma";
import { DatabaseError } from "./error";
import type { Return } from "../types/return";
import { ErrorCode } from "../utils/error";

export async function createSession(props: Prisma.SessionCreateInput) {
	try {
		return await prisma.session.create({
			data: props,
		});
	} catch (error) {
		throw new DatabaseError(error);
	}
}

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
