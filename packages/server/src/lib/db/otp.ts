// OTP Database Utilities
// Provides functions for creating OTP records and retrieving OTPs by code and user ID, with error handling and return types.

import type { Otp, Prisma } from "@/generated/prisma";
import prisma from "./prisma";
import type { Return } from "../types/return";
import { ErrorCode } from "@shared/constant";

/**
 * Creates a new OTP record in the database.
 *
 * @param params - Prisma.OtpCreateInput object with OTP details.
 * @returns The created OTP object.
 */
export async function createOtp(params: Prisma.OtpCreateInput) {
	return await prisma.otp.create({
		data: {
			...params,
		},
	});
}

/**
 * Retrieves an OTP by code and user ID.
 *
 * @param code - The OTP code.
 * @param userId - The user's ID.
 * @returns Return<Otp> with success/data or success/error.
 */
export async function getOtpByCodeAndUserId(
	code: string,
	userId: string,
): Promise<Return<Otp>> {
	const otp = await prisma.otp.findFirst({
		where: {
			code,
			userId,
		},
	});

	if (!otp) {
		return {
			success: false,
			error: {
				message: "Invalid OTP",
				code: ErrorCode.NOT_FOUND,
			},
		};
	}

	return {
		success: true,
		data: otp,
	};
}
