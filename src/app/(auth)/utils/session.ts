import { Return } from '@/types/return';
import { generateAccessToken } from './jwt';
import { createSession } from '@/lib/db';
import { throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { setAuthCookies } from './cookies';

const log = logger.child({ file: 'src/app/(auth)/utils/session.ts' });

export async function setupSession(
    userId: string,
    userAgent?: string,
): Promise<Return<void>> {
    try {
        if (!userId) {
            throwAppError(
                'setupSession',
                'User ID is required to setup session',
                log,
            );
        }

        const accessToken = await generateAccessToken(userId);

        const session = await createSession({
            user: {
                connect: {
                    id: userId,
                },
            },
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            userAgent,
        });

        await setAuthCookies(accessToken, session.data!.id);

        return {
            success: true,
        };
    } catch (error) {
        throwAppError('setupSession', 'Failed to setup session', log, error);
    }
}
