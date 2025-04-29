import { getEnvironmentVariable } from '@/utils/env';
import { Return } from '@/types/return';
import logger from '@/utils/logger';
import { throwAppError } from '@/utils/error';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookies';

const log = logger.child({ file: 'src/app/(auth)/utils/cookies.ts' });
const env = getEnvironmentVariable('NODE_ENV');


export const setAuthCookies = async (
    accessToken: string,
    refreshToken: string,
): Promise<Return<null>> => {
    try {
        await setCookie('accessToken', accessToken, {
            expires: new Date(Date.now() + 60 * 60 * 2000), // 2 hour
            httpOnly: true,
            secure: env === 'production',
            sameSite: 'lax',
        });

        await setCookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000), // 30 days
            httpOnly: true,
            secure: env === 'production',
            sameSite: 'lax',
        });

        return {
            success: true,
            data: null,
        };
    } catch (error) {
        return throwAppError(
            'setAuthCookies',
            'Failed to set auth cookies',
            log,
            error,
        );
    }
};


export const getAuthCookies = async (): Promise<
    Return<{
        accessToken: string | undefined;
        refreshToken: string | undefined;
    }>
> => {
    try {

        const accessToken = await getCookie('accessToken');

        const refreshToken = await getCookie('refreshToken');


        return {
            success: true,
            data: { accessToken, refreshToken },
        };
    } catch (error) {
        return throwAppError(
            'getAuthCookies',
            'Failed to get auth cookies',
            log,
            error,
        );
    }
};


export const deleteAuthCookies = async (): Promise<Return<null>> => {
    try {

        await deleteCookie('accessToken');

        await deleteCookie('refreshToken');

        return {
            success: true,
            data: null,
        };
    } catch (error) {
        return throwAppError(
            'deleteAuthCookies',
            'Failed to delete auth cookies',
            log,
            error,
        );
    }
};
