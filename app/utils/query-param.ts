import { useSearchParams } from 'next/navigation';

export function getQueryParam(query: string) {
    const searchParams = useSearchParams();
    return searchParams.get(query);
}

export function getRedirectPath() {
    let redirectPath = getQueryParam('redirectPath');
    if (!redirectPath) {
        redirectPath = '/dashboard';
    }
    return redirectPath;
}