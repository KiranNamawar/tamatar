type ErrorType =
    | "validation"
    | "authentication"
    | "authorization"
    | "not-found"
    | "conflict"
    | "database"
    | "internal"
    | "unknown";

export interface ErrorReturn {
    ok: false;
    error: ErrorType;
    message: string;
}

export interface SuccessReturn<T> {
    ok: true;
    data: T;
}

export type Return<T> = SuccessReturn<T> | ErrorReturn;