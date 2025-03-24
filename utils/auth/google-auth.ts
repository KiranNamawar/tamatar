import { ErrorType, Return } from '../../types/return';
import { GoogleResponse } from '../../types/google';

export async function getUserInfo(token: string): Promise<Return<any>> {
    const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
            Authorization: token,
        },
    });

    if (!res.ok) return { ok: false, error: ErrorType.unknown, message: 'Failed to fetch user info from google' };

    return { ok: true, data: await res.json() };
}

export async function googleSignupRequest(response: GoogleResponse): Promise<Response> {
    return fetch('/api/auth/google-signup', {
        method: 'GET',
        headers: {
            Authorization: `${response.token_type} ${response.access_token}`,
        },
    });
}

export async function googleLoginRequest(response: GoogleResponse): Promise<Response> {
    return fetch('/api/auth/google-login', {
        method: 'GET',
        headers: {
            Authorization: `${response.token_type} ${response.access_token}`,
        },
    });
}