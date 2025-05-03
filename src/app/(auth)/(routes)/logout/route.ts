import logger from '@/utils/logger';
import { deleteAuthCookies, getAuthCookies } from '../../utils/cookies';
import { handleAppError, throwAppError } from '@/utils/error';
import { NextResponse } from 'next/server';
import { updateSession } from '@/lib/db';

const log = logger.child({ file: 'src/app/(auth)/(routes)/logout/route.ts' });

export async function GET() {
    try {
        const res = await getAuthCookies();
        if (!res.data?.refreshToken) {
            return NextResponse.json(
                { message: 'No refresh token found' },
                { status: 400 },
            );
        }

        const {
            data: { refreshToken },
        } = res;

        const session = await updateSession(refreshToken, {
            isValid: false,
        });
        if (!session.success) {
            return NextResponse.json(
                { message: 'Failed to update session' },
                { status: 500 },
            );
        }

        await deleteAuthCookies();
        log.info('User logged out successfully');
        return NextResponse.json(
            { message: 'Logout successful' },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            handleAppError('Route: /logout', 'Failed to logout', log, error),
            { status: 500 },
        );
    }
}
