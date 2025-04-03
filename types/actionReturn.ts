export type ActionReturn<T> = {
    status: 'success';
    data: T;
} | {
    status: 'error';
    error: string;
} | {
    status: 'idle';
}