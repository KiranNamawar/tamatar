'use server';

import { Return } from '@/types/return';
import { handleAppError, throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { deleteAuthCookies, getAuthCookies } from '../utils/cookies';
import { updateSession } from '@/lib/db';

const log = logger.child({ file: 'src/app/(auth)/logout/action.ts' });

export async function logoutAction(): Promise<Return<void>> {
    try {
        const res = await getAuthCookies();
        if (!res.data?.refreshToken) {
            throwAppError('logoutAction', 'No refresh token found', log);
        }

        const {
            data: { refreshToken },
        } = res;
        const session = await updateSession(refreshToken, {
            isValid: false,
        });
        if (!session.success) {
            throwAppError(
                'logoutAction',
                'Failed to update session',
                log,
                session.error,
            );
        }
        await deleteAuthCookies();
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: handleAppError(
                'logoutAction',
                'Failed to logout',
                log,
                error,
            ).message,
        };
    }
}
