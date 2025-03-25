export type UserAgent = {
    browser: string | undefined;
    browserVersion: string | undefined;
    os: string | undefined;
    osVersion: string | undefined;
};

import { Return, ErrorType } from '@/types/return'; // Types for consistent return structure
import { NextRequest, userAgent } from 'next/server'; // Next.js utilities for user agent parsing

/**
 * Parses the user agent from the request and returns the details.
 * @param {NextRequest} request - The incoming request object.
 * @returns {UserAgent} - An object containing browser and OS details.
 */
export function parseUserAgent(request: NextRequest): UserAgent {
    console.log('Starting parseUserAgent...');
    try {
        const { browser, os } = userAgent(request);
        const userAgentDetails = {
            browser: browser.name,
            browserVersion: browser.version,
            os: os.name,
            osVersion: os.version,
        };
        console.log('User agent parsed successfully:', userAgentDetails);
        return userAgentDetails;
    } catch (error) {
        console.error('Failed to parse user agent:', error);
        return {
            browser: undefined,
            browserVersion: undefined,
            os: undefined,
            osVersion: undefined,
        };
    }
}

/**
 * Retrieves the user agent details from the request.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<Return<UserAgent>>} - A promise that resolves to the user agent details or an error.
 */
export async function getUserAgent(
    request: NextRequest,
): Promise<Return<UserAgent>> {
    console.log('Starting getUserAgent...');
    try {
        const { browser, os } = userAgent(request);
        const userAgentDetails = {
            browser: browser.name,
            browserVersion: browser.version,
            os: os.name,
            osVersion: os.version,
        };
        console.log('User agent retrieved successfully:', userAgentDetails);
        return { ok: true, data: userAgentDetails };
    } catch (error) {
        console.error('Failed to get user agent:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to get user agent',
        };
    }
}
