// --- GraphQL Mutation for Refreshing Token ---

import { graphqlRequest } from "@/graphql";
import { ErrorCode } from "@shared/constant";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { graphql } from "gql.tada";

/**
 * GraphQL mutation for refreshing the access token using a refresh token.
 * Used internally when the JWT is expired or invalid.
 */
const refreshQuery = graphql(`
    mutation RefreshToken($token: String!) {
        refresh(refreshToken: $token)
    }`);

// --- Server Function: Refresh Token ---
/**
 * Server function to refresh JWT using the refresh token from cookies.
 * Returns new access token or error.
 *
 * @returns {Promise<{success: boolean, data?: string, error?: {message: string, code: string}}>} - The result of the refresh operation.
 */
const refresh = createServerFn({
    method: "POST",
}).handler(async () => {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) {
        return {
            success: false,
            error: {
                message: "No refresh token provided",
                code: ErrorCode.UNAUTHORIZED,
            },
        };
    }
    const response = await graphqlRequest({
        query: refreshQuery,
        variables: { token: refreshToken },
    });
    if (response.success) {
        return {
            success: true,
            data: response.data.refresh,
        };
    }
    return {
        success: false,
        error: {
            message: response.error?.message || "Failed to refresh token",
            code: response.error?.code || ErrorCode.INTERNAL_SERVER_ERROR,
        },
    };
});

export { refresh };