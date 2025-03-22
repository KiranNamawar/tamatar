import { useSearchParams } from 'next/navigation';

export function useQueryParam(query: string) {
    const searchParams = useSearchParams();
    return searchParams.get(query);
}

export function useRedirectPath() {
    let redirectPath = useQueryParam('redirectPath');
    if (!redirectPath) {
        redirectPath = '/dashboard';
    }
    return redirectPath;
}