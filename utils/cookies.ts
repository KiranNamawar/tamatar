import { cookies } from 'next/headers';
import { ErrorType, Return } from '../types/return';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function setAuthCookies(accessToken: string, refreshToken: string): Promise<Return<void>> {
    try {
        const cookieStore = await cookies();
        cookieStore.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 15),
        });

        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        });

        return { ok: true, data: undefined };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.internal, message: 'Failed to set auth cookies' };
    }
}

export async function getAccessToken(): Promise<Return<RequestCookie>> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');

        if (accessToken === undefined) {
            return { ok: false, error: ErrorType.authorization, message: 'Missing access token' };
        }

        return { ok: true, data: accessToken };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.internal, message: 'Failed to get access token' };
    }
}

export async function getRefreshToken(): Promise<Return<RequestCookie>> {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken');

        if (refreshToken === undefined) {
            return { ok: false, error: ErrorType.authorization, message: 'Missing refresh token' };
        }

        return { ok: true, data: refreshToken };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.internal, message: 'Failed to get refresh token' };
    }
}

export async function getAuthCookies(): Promise<Return<{ accessToken: RequestCookie, refreshToken: RequestCookie }>> {
    try {
        const accessTokenResult = await getAccessToken();
        if (!accessTokenResult.ok) {
            return accessTokenResult;
        }

        const refreshTokenResult = await getRefreshToken();
        if (!refreshTokenResult.ok) {
            return refreshTokenResult;
        }

        return { ok: true, data: { accessToken: accessTokenResult.data, refreshToken: refreshTokenResult.data } };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.internal, message: 'Failed to get auth cookies' };
    }
}

export async function deleteAuthCookies(): Promise<Return<void>> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');

        return { ok: true, data: undefined };
    } catch (error) {
        console.error(error);
        return { ok: false, error: ErrorType.internal, message: 'Failed to delete auth cookies' };
    }
}
