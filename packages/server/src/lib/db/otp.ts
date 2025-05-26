import type { Otp, Prisma } from "@/generated/prisma";
import prisma from "./prisma";
import type { Return } from "../types/return";
import { ErrorCode } from "@shared/constant";

export async function createOtp(params: Prisma.OtpCreateInput) {
	return await prisma.otp.create({
		data: {
			...params,
		},
	});
}

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
