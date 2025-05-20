export type CookieSameSite = "strict" | "lax" | "none";
export interface CookieListItem {
	name?: string | undefined;
	value?: string | undefined;
	domain?: string | null;
	path?: string | undefined;
	expires: Date | number | null;
	secure?: boolean | undefined;
	sameSite?: CookieSameSite | undefined;
	httpOnly?: boolean | undefined;
}