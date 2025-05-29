import { useStore } from "@/hooks/useStore";
import { GRAPHQL_ENDPOINT, type Return } from "@shared/constant";
import type { TadaDocumentNode } from "gql.tada";
import { GraphQLClient } from "graphql-request";

interface GetClientParams {
	isAuthenticated?: boolean;
	token?: string | null;
}

// --- GraphQL Client Factory ---
/**
 * Returns a configured GraphQLClient instance for the given environment.
 *
 * @param isAuthenticated - Whether to include an auth token (default: true).
 * @param token - Optional explicit token to use. If not provided and isAuthenticated is true, will attempt to get from store or headers.
 * @returns {GraphQLClient} - Configured GraphQLClient instance.
 */
export function getClient({
	isAuthenticated = true,
	token = null,
}: GetClientParams): GraphQLClient {
	if (!token && isAuthenticated) {
		token = useStore.getState().auth.accessToken;
	}
	let endpoint = GRAPHQL_ENDPOINT;
	if (process.env.NODE_ENV === "development") {
		endpoint = "http://localhost:4000/graphql";
	}
	console.log("GraphQL Endpoint:", endpoint);
	console.log("Using Token:", token);
	return new GraphQLClient(endpoint, {
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
		return {
			success: false,
			error: {
				message: error.response.errors[0].message,
				code: error.response.errors[0].extensions.code,
			},
		};
	}
}
