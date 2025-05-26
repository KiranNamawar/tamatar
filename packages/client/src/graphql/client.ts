import { useStore } from "@/hooks/useStore";
import { GRAPHQL_ENDPOINT, type Return } from "@shared/constant";
import type { TadaDocumentNode } from "gql.tada";
import { GraphQLClient } from "graphql-request";

export function getClient(authenticated: boolean): GraphQLClient {
	let token = null;
	if (authenticated) token = useStore.getState().auth.accessToken;

	return new GraphQLClient(GRAPHQL_ENDPOINT, {
		headers: {
			authorization: `Access ${token}`,
		},
	});
}

type graphqlRequestParams<TData = any, TVariables = Record<string, any>> = {
	query: TadaDocumentNode<TData, TVariables, any>;
	variables?: TVariables;
	isAuthenticated?: boolean;
};

export async function graphqlRequest<
	TData = any,
	TVariables = Record<string, any>,
>({
	query,
	variables,
	isAuthenticated = true,
}: graphqlRequestParams<TData, TVariables>): Promise<Return<TData>> {
	const client = getClient(isAuthenticated);
	try {
		const res = await client.request(query, variables ?? {});
		return {
			success: true,
			data: res,
		};
	} catch (error: any) {
		console.log(error)
		return {
			success: false,
			error: {
				message: error.response.errors[0].message,
				code: error.response.errors[0].extensions.code,
			},
		};
	}
}
