import { ErrorType } from "@/types/return";
import { getRefreshToken, setAuthCookies } from "@/utils/cookies";
import { generateAccessToken } from "@/utils/jwt";
import { createJsonResponse, createResponse } from "@/utils/response";
import { verifySession } from "@/utils/session";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { refreshToken } = await request.json();
        if (!refreshToken) {
            return createResponse(null, ErrorType.validation, 'Missing refresh token');
        }

        const session = await verifySession(refreshToken);
        if (!session.ok) {
            return createResponse(null, session.error, session.message);
        }

        const accessToken = await generateAccessToken(session.data.userId);
        if (!accessToken.ok) {
            return createResponse(null, accessToken.error, accessToken.message);
        }
        const token = accessToken.data;
        return createJsonResponse({'accessToken': token}, 200, 'Successfully refreshed access token');
    } catch (error) {
        console.error(error);
        return createResponse(null, ErrorType.internal, 'Failed  to refresh access token');
    }
}