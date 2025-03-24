'use server';

import { Return } from '@/types/return';
import { deleteAuthCookies, getAccessToken } from '@/utils/auth/cookies';
import { verifyAccessToken } from '@/utils/auth/jwt';
import { deleteUserById } from '@/utils/auth/user';

export async function deleteUserAction(): Promise<Return<void>> {
    const accessToken = await getAccessToken();
    if (!accessToken.ok) {
        return {
            ok: false,
            error: accessToken.error,
            message: accessToken.message,
        };
    }
    console.log(accessToken.data.value);

    const userId = await verifyAccessToken(accessToken.data.value);
    if (!userId.ok) {
        return {
            ok: false,
            error: userId.error,
            message: userId.message,
        };
    }
    console.log(userId.data);

    const user = await deleteUserById(userId.data);
    if (!user.ok) {
        return {
            ok: false,
            error: user.error,
            message: user.message,
        };
    }

    const authCookies = await deleteAuthCookies();
    if (!authCookies.ok) {
        return {
            ok: false,
            error: authCookies.error,
            message: authCookies.message,
        };
    }
    console.log('Deleted user and cookies');

    return { ok: true, data: undefined };
}
