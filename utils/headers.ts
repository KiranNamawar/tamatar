import { headers } from 'next/headers';
import { ErrorType, Return } from '../types/return';

export async function getHeaders(query: string): Promise<Return<string>> {
    try {
        const headerslist = await headers();
        const header = headerslist.get(query);
        if (!header)
            return {
                ok: false,
                error: ErrorType.notFound,
                message: 'Header not found',
            };
        return { ok: true, data: header };
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to get headers',
        };
    }
}
export async function getAuthToken(): Promise<Return<string>> {
    const token = await getHeaders('Authorization');
    if (!token.ok)
        return {
            ok: false,
            error: ErrorType.notFound,
            message: 'No token found',
        };
    return { ok: true, data: token.data };
}
