// type ErrorType =
//     | "validation" // 400 Bad Request
//     | "authentication" // 401 Unauthorized
//     | "authorization" // 403 Forbidden
//     | "not-found" // 404 Not Found
//     | "conflict" // 409 Conflict
//     | "database" // 500 Internal Server Error
//     | "internal" // 500 Internal Server Error
//     | "unknown"; // 520 Unknown Error

export enum ErrorType {
    validation = 400,
    authentication = 401,
    authorization = 403,
    notFound = 404,
    conflict = 409,
    database = 500,
    internal = 500,
    unknown = 520,
}

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