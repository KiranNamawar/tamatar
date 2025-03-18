import { User } from "@prisma/client";
import { Return } from "../types/return";
import prisma from "./prisma";

export async function createUserFromGoogleInfo(userInfo: any): Promise<Return<User>> {
    try {
        const user = await prisma.user.create({
            data: {
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture,
                verifiedEmail: userInfo.verified_email,
                googleId: userInfo.id,
            },
        });
        return { ok: true, data: user };
    } catch (error) {
        return { ok: false, error: "database", message: 'Failed to create user in database' };
    }
}

export async function getUserByEmail(email: string): Promise<Return<User>> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) return { ok: false, error:"not-found", message: 'User not found' };
        
        return { ok: true, data: user };

    } catch (error) {
        return { ok: false, error:"database", message: 'Failed to fetch user from database' };
    }
}
