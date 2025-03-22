import { Session } from '@prisma/client';
import prisma from './prisma';
import { ErrorType, Return } from '../types/return';

export async function createUserSession(userAgent: any, userId: string): Promise<Return<Session>> {
    try {
        const session = await prisma.session.create({
            data: {
                userId,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                refreshToken: crypto.randomUUID(),
                os: userAgent.os,
                osVersion: userAgent.osVersion,
                browser: userAgent.browser,
                browserVersion: userAgent.browserVersion,
            },
        });
        return { ok: true, data: session };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.database, message: 'Failed to create session in database' };
    }
}

export async function invalidateSessionByRefreshToken(refreshToken: string): Promise<Return<Session>> {
    try {
        const session = await prisma.session.update({
            where: {
                refreshToken,
            },
            data: {
                isRevoked: true,
                expiresAt: new Date(),
            }
        });
        return { ok: true, data: session };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.database, message: 'Failed to invalidate session in database' };
    }
}

export async function verifySession(refreshToken: string): Promise<Return<Session>> {
    try {
        const session = await prisma.session.findFirst({
            where: {
                refreshToken,
                expiresAt: {
                    gt: new Date(),
                },
                isRevoked: false,
            },
        });
        if (!session) {
            return { ok: false, error: ErrorType.authentication, message: 'Session is invalid or expired' };
        }
        return { ok: true, data: session };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.database, message: 'Failed to verify session in database' };
    }
}