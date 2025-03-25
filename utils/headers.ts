import { headers } from 'next/headers'; // Utility to access headers in Next.js
import { ErrorType, Return } from '../types/return'; // Types for consistent return structure

/**
 * Retrieves a specific header from the request.
 * @param {string} query - The name of the header to retrieve.
 * @returns {Promise<Return<string>>} - A promise that resolves to the header value or an error.
 */
export async function getHeaders(query: string): Promise<Return<string>> {
    console.log('Starting getHeaders...');
    console.log('Header query:', query);

    try {
        const headerslist = await headers(); // Retrieve all headers
        const header = headerslist.get(query); // Get the specific header

        if (!header) {
            console.error('Header not found:', query);
            return {
                ok: false,
                error: ErrorType.notFound,
                message: 'Header not found',
            };
        }

        console.log('Header retrieved successfully:', { query, value: header });
        return { ok: true, data: header };
    } catch (error) {
        console.error('Failed to get headers:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to get headers',
        };
    }
}

/**
 * Retrieves the `Authorization` token from the headers.
 * @returns {Promise<Return<string>>} - A promise that resolves to the token or an error.
 */
export async function getAuthToken(): Promise<Return<string>> {
    console.log('Starting getAuthToken...');

    const token = await getHeaders('Authorization'); // Retrieve the Authorization header

    if (!token.ok) {
        console.error('Authorization token not found.');
        return {
            ok: false,
            error: ErrorType.notFound,
            message: 'No token found',
        };
    }

    console.log('Authorization token retrieved successfully:', token.data);
    return { ok: true, data: token.data };
}
