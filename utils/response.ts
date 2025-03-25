import { NextResponse } from 'next/server'; // Next.js response utility

/**
 * Creates a standard HTTP response.
 * @param {any} data - The response body data.
 * @param {number} status - The HTTP status code.
 * @param {string} message - A custom message to include in the response headers.
 * @returns {NextResponse} - A Next.js response object.
 */
export function createResponse(data: any, status: number, message: string) {
    console.log('Creating response...');
    console.log('Status:', status);
    console.log('Message:', message);
    console.log('Data:', data);

    return new NextResponse(data, {
        status: status,
        headers: {
            'X-Message': message, // Custom header to include the message
        },
    });
}

/**
 * Creates a standard JSON HTTP response.
 * @param {any} data - The response body data.
 * @param {number} status - The HTTP status code.
 * @param {string} message - A custom message to include in the response headers.
 * @returns {NextResponse} - A Next.js JSON response object.
 */
export function createJsonResponse(data: any, status: number, message: string) {
    console.log('Creating JSON response...');
    console.log('Status:', status);
    console.log('Message:', message);
    console.log('Data:', data);

    return NextResponse.json(data, {
        status: status,
        headers: {
            'X-Message': message, // Custom header to include the message
        },
    });
}
