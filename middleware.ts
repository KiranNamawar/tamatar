import { NextRequest, NextResponse } from 'next/server'; // Next.js utilities for handling requests and responses
import { verifyAccessToken } from './utils/auth/jwt'; // Utility to verify access tokens
import { setAuthCookies } from './utils/auth/cookies'; // Utility to set authentication cookies
import { refreshAccessToken } from './utils/auth/refresh'; // Utility to refresh access tokens

/**
 * Middleware to handle authentication and redirection based on user state.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A Next.js response object.
 */
export async function middleware(request: NextRequest) {
    console.log('Starting middleware...');
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const pathname = request.nextUrl.pathname;
    let redirectPath = pathname;

    console.log('Pathname:', pathname);
    console.log('Access Token:', accessToken ? 'Present' : 'Not Present');
    console.log('Refresh Token:', refreshToken ? 'Present' : 'Not Present');

    switch (pathname) {
        case '/login':
        case '/signup':
            console.log(`Handling ${pathname} route...`);
            if (refreshToken) {
                if (accessToken) {
                    console.log('Verifying access token...');
                    const userID = await verifyAccessToken(accessToken);
                    if (userID.ok) {
                        console.log(
                            'Access token is valid. Redirecting to /dashboard...',
                        );
                        return NextResponse.redirect(
                            new URL('/dashboard', request.url),
                        );
                    }
                }
                console.log('Refreshing access token...');
                const newAccessToken = await refreshAccessToken(
                    refreshToken,
                    request,
                );
                if (newAccessToken.ok) {
                    console.log(
                        'Access token refreshed successfully. Setting cookies...',
                    );
                    const authCookies = await setAuthCookies(
                        newAccessToken.data,
                        refreshToken,
                    );
                    if (authCookies.ok) {
                        console.log(
                            'Cookies set successfully. Redirecting to /dashboard...',
                        );
                        return NextResponse.redirect(
                            new URL('/dashboard', request.url),
                        );
                    }
                }
            }
            console.log(
                'No valid tokens found. Proceeding to next middleware...',
            );
            return NextResponse.next();

        default:
            console.log(`Handling protected route: ${pathname}`);
            if (refreshToken) {
                if (accessToken) {
                    console.log('Verifying access token...');
                    const userID = await verifyAccessToken(accessToken);
                    if (userID.ok) {
                        console.log(
                            'Access token is valid. Proceeding to next middleware...',
                        );
                        return NextResponse.next();
                    }
                }
                console.log('Refreshing access token...');
                const newAccessToken = await refreshAccessToken(
                    refreshToken,
                    request,
                );
                if (newAccessToken.ok) {
                    console.log(
                        'Access token refreshed successfully. Setting cookies...',
                    );
                    const authCookies = await setAuthCookies(
                        newAccessToken.data,
                        refreshToken,
                    );
                    if (authCookies.ok) {
                        console.log(
                            'Cookies set successfully. Proceeding to next middleware...',
                        );
                        return NextResponse.next();
                    }
                }
            }
            console.log('No valid tokens found. Redirecting to login...');
            return NextResponse.redirect(
                new URL(`/login?redirectPath=${redirectPath}`, request.url),
            );
    }
}

export const config = {
    matcher: ['/dashboard', '/login', '/signup', '/tmtr/:path+'], // Routes where the middleware will be applied
};
