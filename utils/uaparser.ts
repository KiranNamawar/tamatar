export type UserAgent = {
    browser: string | undefined;
    browserVersion: string | undefined;
    os: string | undefined;
    osVersion: string | undefined;
};

import { Return, ErrorType } from '@/types/return'; // Types for consistent return structure
import { NextRequest, userAgent } from 'next/server'; // Next.js utilities for user agent parsing
import { UAParser } from 'ua-parser-js'; // Library for parsing user agent strings

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

/**
 * Parses the user agent string and returns the browser and OS details.
 * @param {string} userAgentString - The user agent string to parse.
 * @returns {UserAgent} - An object containing the browser and OS details.
 */
export function parseUserAgent(userAgentString: string): UserAgent {
    console.log('Parsing user agent string:', userAgentString);
    const { browser, os } = UAParser(userAgentString);
    const userAgentDetails = {
        browser: browser.name,
        browserVersion: browser.version,
        os: os.name,
        osVersion: os.version,
    };
    console.log('Parsed user agent details:', userAgentDetails);
    return userAgentDetails;
}