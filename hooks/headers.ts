export function useHeaders(res: Response, query: string) {
    const header = res.headers.get(query);
    if (!header) return { ok: false, error: 'not-found', message: 'Header not found' };
    return { ok: true, data: header };
}
