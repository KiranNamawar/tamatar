import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { getEnvVariable } from "./env";
import type { Return } from "../types/return";
import { ErrorCode } from "./error";

export async function createToken(params: {
	payload: {
		sub?: string;
		[key: string]: any;
	};
	expiresInMinutes: number;
}) {
	const token = new SignJWT(params.payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(`${params.expiresInMinutes}m`)
		.sign(new TextEncoder().encode(getEnvVariable("JWT_SECRET")));

	return token;
}

export async function verifyToken(token: string): Promise<Return<JWTPayload>> {
	const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET"));
	try {
		const { payload } = await jwtVerify(token, secret);
		return {
			success: true,
			data: payload,
		};
	} catch (error: any) {
		return {
			success: false,
			error: {
				code: ErrorCode.INVALID_JWT,
				message: error.message,
			},
		};
	}
}
