import { headers } from "next/headers";
import { Return } from "../types/return";

export async function getHeaders(query: string): Promise<Return<string>> {
    try {
        const headerslist = await headers();
        const header = headerslist.get(query);
        if (!header) return { ok: false, error: "not-found", message: 'Header not found' };
        return { ok: true, data: header };
    }
    catch (error) {
        console.error(error);
        return { ok: false, error: "internal", message: 'Failed to get headers' };
    }
}