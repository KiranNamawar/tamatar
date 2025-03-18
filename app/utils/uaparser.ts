import { UAParser } from 'ua-parser-js';

export type UserAgent = {
    browser: string | undefined;
    browserVersion: string | undefined;
    os: string | undefined;
    osVersion: string | undefined;
};

export function parseUserAgent(userAgentString: string): UserAgent {
    const { browser, os } = UAParser(userAgentString);
    return {
        browser: browser.name,
        browserVersion: browser.version,
        os: os.name,
        osVersion: os.version,
    };
}
