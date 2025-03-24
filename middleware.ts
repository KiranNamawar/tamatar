import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './utils/auth/jwt';
import { setAuthCookies } from './utils/auth/cookies';
import { refreshAccessToken } from './utils/auth/refresh';

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const pathname = request.nextUrl.pathname;
    let redirectPath = pathname;

    switch (pathname) {
        case '/login':
        case '/signup':
            if (refreshToken) {
                if (accessToken) {
                    const userID = await verifyAccessToken(accessToken);
                    if (userID.ok) {
                        return NextResponse.redirect(
                            new URL('/dashboard', request.url),
                        );
                    }
                }
                const newAccessToken = await refreshAccessToken(
                    refreshToken,
                    request,
                );
                if (newAccessToken.ok) {
                    const authCookies = await setAuthCookies(
                        newAccessToken.data,
                        refreshToken,
                    );
                    if (authCookies.ok) {
                        return NextResponse.redirect(
                            new URL('/dashboard', request.url),
                        );
                    }
                }
            }
            return NextResponse.next();
        default:
            if (refreshToken) {
                if (accessToken) {
                    const userID = await verifyAccessToken(accessToken);
                    if (userID.ok) {
                        return NextResponse.next();
                    }
                }
                const newAccessToken = await refreshAccessToken(
                    refreshToken,
                    request,
                );
                if (newAccessToken.ok) {
                    const authCookies = await setAuthCookies(
                        newAccessToken.data,
                        refreshToken,
                    );
                    if (authCookies.ok) {
                        return NextResponse.next();
                    }
                }
            }
            return NextResponse.redirect(
                new URL(`/login?redirectPath=${redirectPath}`, request.url),
            );
    }
}

export const config = {
    matcher: ['/dashboard', '/login', '/signup'],
};
