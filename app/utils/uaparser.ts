import { UAParser } from 'ua-parser-js';

export function parseUserAgent(userAgentString: string) {
    const { browser, os } = UAParser(userAgentString);
    return {
        browser: browser.name,
        browserVersion: browser.version,
        os: os.name,
        osVersion: os.version,
    };
}
