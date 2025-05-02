'use server';

/**
 * Logout Action Handler
 *
 * This module handles the logout process, including session invalidation, cookie deletion,
 * and error handling. Ensures that user sessions are securely terminated and all relevant
 * authentication cookies are removed.
 *
 * Responsibilities:
 * - Invalidate the user's refresh token/session in the database
 * - Delete authentication cookies
 * - Return standardized error objects on failure
 */
import { Return } from '@/types/return';
import { handleAppError, throwAppError } from '@/utils/error';
import logger from '@/utils/logger';
import { deleteAuthCookies, getAuthCookies } from './cookies';
import { updateSession } from '@/lib/db';

const log = logger.child({ file: 'src/app/(auth)/utils/logout/action.ts' });

/**
 * Handles user logout and session invalidation.
 *
 * @returns Promise resolving to a Return object indicating success or error
 */
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
        log.info('User logged out successfully');
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
