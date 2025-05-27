// JWT Utility Functions
// Provides functions for creating and verifying JWT tokens for authentication.

import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { getEnvVariable } from "./env";
import type { Return } from "../types/return";
import { ErrorCode } from "@shared/constant";

/**
 * Creates a JWT token with the given payload and expiration time (in minutes).
 *
 * @param params.payload - The payload to include in the token (e.g., user id as `sub`).
 * @param params.expiresInMinutes - Token expiration time in minutes.
 * @returns A signed JWT token as a string.
 */
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

/**
 * Verifies a JWT token and returns the decoded payload if valid.
 *
 * @param token - The JWT token to verify.
 * @returns An object with success/data or success/error.
 */
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
