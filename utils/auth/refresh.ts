import { NextRequest } from 'next/server';
import { Return, ErrorType } from '../../types/return';

export async function refreshAccessToken(
    refreshToken: string,
    request: NextRequest,
): Promise<Return<string>> {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();
        return { ok: true, data: data.accessToken };
    } else {
        return {
            ok: false,
            error: ErrorType.validation,
            message: 'Failed to refresh access token',
        };
    }
}
