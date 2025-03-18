import { error } from 'console';
import { NextRequest } from 'next/server';
import { Return } from '../types/return';

export async function getUserInfo(token: string): Promise<Return<any>> {
    const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
            Authorization: token,
        },
    });

    if (!res.ok) return { ok: false, error: "unknown" ,message: 'Failed to fetch user info from google' };

    return { ok: true, data: await res.json() };
}

export function getAuthToken(request: NextRequest): Return<string> {
    const token = request.headers.get('Authorization');
    if (!token) return { ok: false, error: "validation" ,message: 'No token found' };
    return { ok: true,  data: token };
}
