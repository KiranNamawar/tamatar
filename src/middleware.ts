/**
 * Application middleware for authentication and route protection.
 *
 * This middleware intercepts requests to protected routes and ensures users are authenticated.
 * - If a valid access token is present, allows access to protected routes.
 * - If only a refresh token is present, attempts to refresh the access token.
 * - Redirects unauthenticated users to the login page, preserving the intended destination.
 * - Redirects already authenticated users away from login/signup pages to the dashboard.
 *
 * @param request - Next.js request object
 * @returns NextResponse indicating whether to proceed, redirect, or return an error
 */
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './app/(auth)/utils/jwt';
import { handleAppError } from './utils/error';
import logger from './utils/logger';

// Create a child logger for scoped logging in this file
const log = logger.child({ file: 'src/middleware.ts' });

/**
 * Middleware entry point for all matched routes.
 * Handles authentication logic and route redirection.
 */
export async function middleware(request: NextRequest) {
    // Log middleware invocation for debugging
    log.debug({}, 'Middleware is running...');
    try {
        // Extract tokens from cookies
        const accessToken = request.cookies.get('accessToken')?.value;
        const refreshToken = request.cookies.get('refreshToken')?.value;
        const pathname = request.nextUrl.pathname;
        let redirectPath = pathname; // Used to preserve the intended destination

        log.debug({ pathname, accessToken: !!accessToken, refreshToken: !!refreshToken }, 'Checking authentication tokens');

        // Define routes that should not be accessible to authenticated users
        const AuthRoutes = ['/login', '/signup'];

        // If refresh token exists, user may be logged in or session can be refreshed
        if (refreshToken) {
            // If access token is present, verify it
            if (accessToken) {
                const userId = await verifyAccessToken(accessToken);
                if (userId) {
                    // If already logged in, redirect away from login/signup
                    if (AuthRoutes.includes(pathname)) {
                        log.info({ pathname }, 'Authenticated user accessing auth route; redirecting to dashboard');
                        return NextResponse.redirect(
                            new URL('/dashboard', request.url),
                        );
                    } else {
                        // Allow access to protected routes
                        return NextResponse.next();
                    }
                }
            }
            // If access token is missing or invalid, attempt to refresh
            const res = await fetch(`${request.nextUrl.origin}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });
            if (res.ok) {
                // After refresh, treat as authenticated
                if (AuthRoutes.includes(pathname)) {
                    log.info({ pathname }, 'Refreshed session; redirecting to dashboard');
                    return NextResponse.redirect(
                        new URL('/dashboard', request.url),
                    );
                } else {
                    return NextResponse.next();
                }
            }
        }
        // If route is public (login/signup), allow access
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            // Otherwise, redirect unauthenticated users to login, preserving intended path
            log.info({ pathname }, 'Unauthenticated access to protected route; redirecting to login');
            return NextResponse.redirect(
                new URL(`/login?redirectPath=${redirectPath}`, request.url),
            );
        }
    } catch (error) {
        // Handle unexpected errors and return a standardized error response
        return NextResponse.json(
            handleAppError(
                'middleware',
                'Failed to verify access token',
                log,
                error,
            ),
            {
                status: 500,
            },
        );
    }
}

export const config = {
    matcher: ['/login', "/signup", '/dashboard/:path*'],
}