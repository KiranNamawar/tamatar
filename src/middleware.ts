import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './app/(auth)/utils/jwt';
import { handleAppError } from './utils/error';
import logger from './utils/logger';

const log = logger.child({ file: 'src/middleware.ts' });

export async function middleware(request: NextRequest) {
    console.log('Middleware is running...');
    try {
        const accessToken = request.cookies.get('accessToken')?.value;
        const refreshToken = request.cookies.get('refreshToken')?.value;
        const pathname = request.nextUrl.pathname;
        // eslint-disable-next-line prefer-const
        let redirectPath = pathname;

        console.log('Pathname:', pathname);
        console.log('Access Token:', accessToken ? 'Present' : 'Not Present');
        console.log('Refresh Token:', refreshToken ? 'Present' : 'Not Present');
        const AuthRoutes = ['/login', '/signup'];
        if (refreshToken) {
            if (accessToken) {
                const userId = await verifyAccessToken(accessToken);
                if (userId) {
                    if (AuthRoutes.includes(pathname)) {
                        return NextResponse.redirect(
                            new URL('/dashboard', request.url),
                        );
                    } else {
                        return NextResponse.next();
                    }
                }
            }
            const res = await fetch(`${request.nextUrl.origin}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });
            if (res.ok) {
                if (AuthRoutes.includes(pathname)) {
                    return NextResponse.redirect(
                        new URL('/dashboard', request.url),
                    );
                } else {
                    return NextResponse.next();
                }
            }
        }
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(`/login?redirectPath=${redirectPath}`, request.url),
            );
        }
    } catch (error) {
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