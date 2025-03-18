import jwt from 'jsonwebtoken';
import { Return } from '../types/return';

export function generateAccessToken(userId: string): Return<string> {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET || '', {
        expiresIn: '15m',
    });

    if (!accessToken) return { ok: false, error: "internal", message: 'Failed to generate access token' };

    return { ok: true, data: accessToken };
}