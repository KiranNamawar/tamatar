import { Session } from '@prisma/client';
import prisma from './prisma';
import { UserAgent } from './uaparser';
import { Return } from '../types/return';


export async function createUserSession(userAgent: UserAgent, userId: string): Promise<Return<Session>> {
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
        return { ok: false, error: "database", message: 'Failed to create session in database' };
    }
}
