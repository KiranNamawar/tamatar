import { NextResponse } from "next/server";

export function createResponse(data: any, status: number, message: string) {
    return new NextResponse(data, {
        status: status,
        headers: {
            'X-Message': message,
         },
    });
}

export function createJsonResponse(data: any, status: number, message: string) {
    return NextResponse.json(data, {
        status: status,
        headers: {
            'X-Message': message,
        },
    });
}                                                           