import { useStore } from "@/hooks/useStore";
import { refresh } from "@auth/refresh";
import { ErrorCode, GRAPHQL_ENDPOINT, type Return } from "@shared/constant";
// import { getHeader } from "@tanstack/react-start/server";
import type { TadaDocumentNode } from "gql.tada";
import { GraphQLClient } from "graphql-request";



interface GetClientParams {
	isAuthenticated?: boolean;
	token?: string | null;
	env?: "server" | "client";
}

// --- GraphQL Client Factory ---
/**
 * Returns a configured GraphQLClient instance for the given environment.
 *
 * @param isAuthenticated - Whether to include an auth token (default: true).
 * @param token - Optional explicit token to use. If not provided and isAuthenticated is true, will attempt to get from store or headers.
 * @param env - "client" or "server" (default: "client"). Determines where to get the token from.
 * @returns {GraphQLClient} - Configured GraphQLClient instance.
 */
export function getClient({
	isAuthenticated = true,
	token = null,
	env = "client",
}: GetClientParams): GraphQLClient {
	if (!token && isAuthenticated) {
		if (env === "client") {
			token = useStore.getState().auth.accessToken;
		}
		// } else if (env === "server") {
		// 	token = getHeader("Authorization")?.replace("Bearer ", "") ?? null;
		// }
	}
	return new GraphQLClient(GRAPHQL_ENDPOINT, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
}

/**
 * Parameters for making a GraphQL request.
 * @template TData - The expected data type returned by the query.
 * @template TVariables - The variables type for the query.
 * @property query - The GraphQL query/mutation document.
 * @property variables - Optional variables for the query.
 * @property clientOptions - Options for client/server and authentication.
 */
type graphqlRequestParams<TData = any, TVariables = Record<string, any>> = {
	query: TadaDocumentNode<TData, TVariables, any>;
	variables?: TVariables;
	clientOptions?: GetClientParams;
};

/**
 * Makes a GraphQL request, handling token refresh and auth state.
 * If the JWT is invalid, attempts to refresh and retry the request.
 * Updates Zustand auth state on the client after refresh.
 *
 * @template TData - The expected data type returned by the query.
 * @template TVariables - The variables type for the query.
 * @param {graphqlRequestParams<TData, TVariables>} params - The request parameters.
 * @returns {Promise<Return<TData>>} - The result of the GraphQL request.
 */
export async function graphqlRequest<
	TData = any,
	TVariables = Record<string, any>,
>({
	query,
	variables,
	clientOptions,
}: graphqlRequestParams<TData, TVariables>): Promise<Return<TData>> {
	const client = getClient(clientOptions ?? {});
	try {
		const res = await client.request(query, variables ?? {});
		return {
			success: true,
			data: res,
		};
	} catch (error: any) {
		// Handle invalid JWT: try to refresh and retry
		if (error.response.errors[0].extensions.code === ErrorCode.INVALID_JWT) {
			const response = await refresh();
			if (response.success) {
				if (clientOptions?.env === "client" && typeof window !== "undefined") {
					useStore.getState().auth.setAccessToken(response.data ?? null);
					// Retry the request with updated token
					return graphqlRequest({
						query,
						variables,
						clientOptions,
					});
				}
				// Server environment: retry with new token
				return graphqlRequest({
					query,
					variables,
					clientOptions: {
						token: response.data,
					},
				});
			}
			// If refresh fails due to unauthorized, clear client token
			if (
				response.error?.code === ErrorCode.UNAUTHORIZED &&
				typeof window !== "undefined"
			) {
				useStore.getState().auth.setAccessToken(null);
			}
			return {
				success: false,
				error: {
					message: response.error?.message || "Failed to refresh token",
					code: response.error?.code || ErrorCode.INTERNAL_SERVER_ERROR,
				},
			};
		}
		// Other errors
		return {
			success: false,
			error: {
				message: error.response.errors[0].message,
				code: error.response.errors[0].extensions.code,
			},
		};
	}
}
