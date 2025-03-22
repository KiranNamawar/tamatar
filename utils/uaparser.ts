export type UserAgent = {
    browser: string | undefined;
    browserVersion: string | undefined;
    os: string | undefined;
    osVersion: string | undefined;
};

import { Return, ErrorType } from '@/types/return';
import { NextRequest, userAgent } from 'next/server';

export function parseUserAgent(request: NextRequest) {}
export async function getUserAgent(request: NextRequest): Promise<Return<UserAgent>> {
    try {
        const { browser, os } = userAgent(request);
        return {
            ok: true, data: {
                browser: browser.name,
                browserVersion: browser.version,
                os: os.name,
                osVersion: os.version,
            },
         };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to get user agent',
        };
    }
}
