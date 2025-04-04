import { ErrorType, Return } from '@/types/return';
import prisma from '../prisma';
import { Url, UrlVisit } from '@prisma/client';
import { UserAgent } from '../uaparser';

/**
 * Creates a new URL entry in the database.
 * @param originalUrl - The original URL to be shortened.
 * @param shortCode - The unique short code for the URL.
 * @param profileId - The ID of the profile creating the URL.
 * @param expiresAt - Optional expiration date for the URL.
 * @param folderId - Optional folder ID for organizing the URL.
 * @returns A promise containing the result of the URL creation.
 */
export async function createUrl({
    originalUrl,
    shortCode,
    profileId,
    folderId,
    expiresAt,
}: {
    originalUrl: string;
    shortCode: string;
    profileId: string;
    expiresAt?: Date;
    folderId?: string;
}): Promise<Return<Url>> {
    console.log(
        '[createUrl] Attempting to create URL with the following data:',
        {
            originalUrl,
            shortCode,
            profileId,
            folderId,
            expiresAt,
        },
    );

    try {
        const url = await prisma.url.create({
            data: {
                originalUrl,
                shortCode,
                profileId,
                expiresAt,
                folderId,
            },
        });
        console.log('[createUrl] URL created successfully:', url);
        return {
            ok: true,
            data: url,
        };
    } catch (error) {
        console.error('[createUrl] Error creating URL:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Error creating URL',
        };
    }
}

/**
 * Fetches a URL entry from the database using its short code.
 * @param shortCode - The unique short code of the URL.
 * @returns A promise containing the result of the URL fetch operation.
 */
export async function getUrlByShortCode(
    shortCode: string,
): Promise<Return<Url>> {
    console.log('[getUrlByShortCode] Fetching URL with short code:', shortCode);

    try {
        const url = await prisma.url.findUnique({
            where: {
                shortCode,
            },
        });

        if (!url) {
            console.warn(
                '[getUrlByShortCode] No URL found for short code:',
                shortCode,
            );
            return {
                ok: false,
                error: ErrorType.notFound,
                message: 'URL not found',
            };
        }

        console.log('[getUrlByShortCode] URL fetched successfully:', url);
        return {
            ok: true,
            data: url,
        };
    } catch (error) {
        console.error('[getUrlByShortCode] Error fetching URL:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Error fetching URL',
        };
    }
}

/**
 * Creates a new URL visit entry in the database.
 * @param urlId - The ID of the URL being visited.
 * @param userAgent - The user agent details of the visitor.
 * @returns A promise containing the result of the URL visit creation.
 */
export async function createUrlVisit(
    urlId: string,
    userAgent: UserAgent,
): Promise<Return<UrlVisit>> {
    console.log(
        '[createUrlVisit] Creating URL visit with the following data:',
        {
            urlId,
            userAgent,
        },
    );

    try {
        const urlVisit = await prisma.urlVisit.create({
            data: {
                urlId,
                browser: userAgent.browser,
                browserVersion: userAgent.browserVersion,
                os: userAgent.os,
                osVersion: userAgent.osVersion,
            },
        });
        console.log(
            '[createUrlVisit] URL visit created successfully:',
            urlVisit,
        );
        return {
            ok: true,
            data: urlVisit,
        };
    } catch (error) {
        console.error('[createUrlVisit] Error creating URL visit:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Error creating URL visit',
        };
    }
}

/**
 * Fetches all URLs associated with a specific profile ID.
 * @param profileId - The ID of the profile whose URLs are to be fetched.
 * @return A promise containing the result of the URL fetch operation.
 * */
export async function getUrlsByProfileId(
    profileId: string,
): Promise<Return<Url[]>> {
    console.log('[getUrlsByProfileId] Fetching URLs for profile ID:');

    try {
        const urls = await prisma.url.findMany({
            where: {
                profileId,
            },
        });

        console.log('[getUrlsByProfileId] URLs fetched successfully:', urls);
        return {
            ok: true,
            data: urls,
        };
    } catch (error) {
        console.error('[getUrlsByProfileId] Error fetching URLs:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Error fetching URLs',
        };
    }
}

/**
 * Fetches all URL visits associated with a specific URL ID.
 * @param urlId - The ID of the URL whose visits are to be fetched.
 * @return A promise containing the result of the URL visit fetch operation.
 * */
export async function getUrlVisits(urlId: string): Promise<Return<UrlVisit[]>> {
    console.log('[getUrlVisits] Fetching URL visits for URL ID:', urlId);

    try {
        const urlVisits = await prisma.urlVisit.findMany({
            where: {
                urlId,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        console.log(
            '[getUrlVisits] URL visits fetched successfully:',
            urlVisits,
        );
        return {
            ok: true,
            data: urlVisits,
        };
    } catch (error) {
        console.error('[getUrlVisits] Error fetching URL visits:', error);
        return {
            ok: false,
            error: ErrorType.database,
            message: 'Error fetching URL visits',
        };
    }
}
