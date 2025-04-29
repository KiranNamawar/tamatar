import { UtilityReturn } from '@/types/return';
import logger from '@/utils/logger';
import { throwAppError } from '@/utils/error';
import { createToken, verifyToken } from '@/utils/jwt';

const log = logger.child({ file: 'src/app/(auth)/utils/jwt.ts' });


export async function generateAccessToken(
    userId: string,
): Promise<UtilityReturn<string>> {
    try {
        const token = await createToken({ userId }, 120);


        return token;
    } catch (error) {
        throwAppError(
            'generateAccessToken',
            'Error generating access token',
            log,
            error,
        );
    }
}


export async function verifyAccessToken(
    token: string,
): Promise<UtilityReturn<string>> {
    try {
        const payload = await verifyToken(token);


        return payload.userId as string;
    } catch (error) {
        throwAppError(
            'verifyAccessToken',
            'Error verifying access token',
            log,
            error,
        );
    }
}
