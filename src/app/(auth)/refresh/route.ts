import { getSessionById } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { generateAccessToken } from '../utils/jwt';
import { setAuthCookies } from '../utils/cookies';
import { handleAppError } from '@/utils/error';
import logger from '@/utils/logger';

const log = logger.child({ file: 'src/app/(auth)/refresh/route.ts' });

export async function POST(request: NextRequest) {
    try {
        const { refreshToken } = await request.json();
        if (!refreshToken) {
            return NextResponse.json(
                { message: 'Refresh token is required' },
                { status: 400 },
            );
        }
        const session = await getSessionById(refreshToken);
        if (!session.success) {
            return NextResponse.json(
                { message: 'Session not found' },
                { status: 404 },
            );
        }
        const accessToken = await generateAccessToken(session.data!.userId);

        await setAuthCookies(accessToken, refreshToken);
        return NextResponse.json(
            { message: 'Refresh Successful' },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            handleAppError(
                'Route: /refresh',
                'Failed to refresh Access Token',
                log,
                error,
            ),
            { status: 500 },
        );
    }
}
