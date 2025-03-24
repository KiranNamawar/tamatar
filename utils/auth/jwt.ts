import { SignJWT, jwtVerify } from 'jose';
import { ErrorType, Return } from '../../types/return';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
const alg = 'HS256';


export async function generateAccessToken(userId: string): Promise<Return<string>> {
    try {
        const accessToken = await new SignJWT({ userId }).setExpirationTime('15m').setProtectedHeader({alg}).sign(secret);

        return { ok: true, data: accessToken };
    } catch (error) {
        console.error('Error generating access token:', error);
        return {
            ok: false,
            error: ErrorType.internal,
            message: 'Failed to generate access token',
        };
    }
}

export async function verifyAccessToken(accessToken: string): Promise<Return<string>> {
    try {
        const { payload
        } = await jwtVerify(accessToken, secret);
        return { ok: true, data: payload.userId as string };
    } catch (error) {
        console.error('Error verifying access token:', error);
        return {
            ok: false,
            error: ErrorType.authentication,
            message: 'Failed to verify access token',
        };
    }
}
