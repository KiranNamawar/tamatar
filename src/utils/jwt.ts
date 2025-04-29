/**
 * JWT token utilities
 * 
 * This module provides functions for creating and verifying JWT tokens
 * used for authentication and authorization throughout the application.
 * It uses the jose library for JWT operations with consistent error handling.
 */
import { throwAppError } from './error';
import { UtilityReturn } from '@/types/return';
import { SignJWT, jwtVerify } from 'jose';
import { getEnvironmentVariable } from './env';
import logger from './logger';

/**
 * Logger instance scoped to this file for consistent logging context
 */
const log = logger.child({ file: 'src/utils/jwt.ts' });

/**
 * Type for JWT payload with common fields
 */
export type JwtPayload = {
    sub?: string;
    [key: string]: any;
};

/**
 * Creates a JWT token with the provided data and expiration time
 * 
 * @param data - The payload data to include in the token
 * @param expiresInMinutes - Token expiration time in minutes
 * @returns A promise resolving to the signed JWT token string
 */
export async function createToken(
    data: JwtPayload,
    expiresInMinutes: number,
): Promise<UtilityReturn<string>> {
    try {
        // Create a JWT with standard claims and custom data
        const jwt = new SignJWT(data)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(`${expiresInMinutes}m`);

        // Add subject if provided
        if (data.sub) {
            jwt.setSubject(data.sub);
        }

        // Sign the token with the secret key
        const token = await jwt.sign(
            new TextEncoder().encode(getEnvironmentVariable('JWT_SECRET')),
        );

        log.info({ 
            subject: data.sub || 'none',
            expiresInMinutes,
            tokenId: data.jti || 'none'
        }, 'JWT token created successfully');

        return token;
    } catch (error) {
        throwAppError('createToken', 'Error creating JWT token', log, error);
    }
}

/**
 * Verifies a JWT token and returns its payload
 * 
 * @param token - The JWT token string to verify
 * @returns A promise resolving to the decoded payload
 */
export async function verifyToken(token: string): Promise<UtilityReturn<JwtPayload>> {
    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(getEnvironmentVariable('JWT_SECRET')),
        );

        log.info({ 
            subject: payload.sub || 'none',
            tokenId: payload.jti || 'none',
            issuedAt: payload.iat ? new Date(payload.iat as number * 1000).toISOString() : 'unknown',
            expiresAt: payload.exp ? new Date(payload.exp as number * 1000).toISOString() : 'unknown'
        }, 'JWT token verified successfully');

        return payload as JwtPayload;
    } catch (error) {
        throwAppError('verifyToken', 'Error verifying JWT token', log, error);
    }
}
