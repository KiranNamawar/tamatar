'use server';

import { Return } from '@/types/return';
import { deleteAuthCookies, getAuthCookies } from '../utils/cookies';
import { invalidateSessionByRefreshToken } from '../utils/session';

export default async function logoutAction(): Promise<Return<void>> {
    const authCookies = await getAuthCookies();
    if (!authCookies.ok)
        return {
            ok: false,
            error: authCookies.error,
            message: authCookies.message,
        };

    const { refreshToken } = authCookies.data;

    const session = await invalidateSessionByRefreshToken(refreshToken.value);
    if (!session.ok)
        return { ok: false, error: session.error, message: session.message };

    const deleteCookies = await deleteAuthCookies();
    if (!deleteCookies.ok)
        return {
            ok: false,
            error: deleteCookies.error,
            message: deleteCookies.message,
        };

    return { ok: true, data: undefined };
}

export async function clearAuthCookiesAction(): Promise<Return<void>> {
    const deleteCookies = await deleteAuthCookies();
    if (!deleteCookies.ok)
        return {
            ok: false,
            error: deleteCookies.error,
            message: deleteCookies.message,
        };

    return { ok: true, data: undefined };
}