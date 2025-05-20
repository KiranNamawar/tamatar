import type { Prisma, User } from "@/generated/prisma";
import prisma from "./prisma";
import { AppError, ErrorCode } from "../utils/error";
import { DatabaseError } from "./error";
import type { Return } from "../types/return";

export async function createUser(params: Prisma.UserCreateInput) {
	try {
		return await prisma.user.create({
			data: params,
		});
	} catch (error) {
		throw new DatabaseError(error);
	}
}

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
