import { setCookie } from "@tanstack/react-start/server";
import { REFRESH_TOKEN_EXPIRY_IN_MINUTES } from "@shared/constant";


export function setAuthCookie(refreshToken: string) {
	setCookie("refreshToken", refreshToken, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_IN_MINUTES * 60 * 1000), // 30 days
	});
}
