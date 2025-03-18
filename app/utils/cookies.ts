import { cookies } from "next/headers";
import { Return } from "../types/return";

export async function setAuthCookie(accessToken: string, refreshToken: string): Promise<Return<void>> {
    try {
        const cookieStore = await cookies();
        cookieStore.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 15),
        })
    
        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })
        
        return { ok: true, data: undefined };
    } catch (error) {
        return { ok: false, error: "internal", message: 'Failed to set auth cookies' };
    }
}