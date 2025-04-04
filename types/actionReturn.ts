export type ActionReturn<T> = {
    status: 'success';
    data: T;
} | {
    status: 'error';
    error: string | string[];
} | {
    status: 'idle';
}