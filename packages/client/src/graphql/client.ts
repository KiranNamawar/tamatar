import { useStore } from "@/hooks/useStore";
import { GRAPHQL_ENDPOINT, type Return } from "@shared/constant";
import type { TadaDocumentNode } from "gql.tada";
import { GraphQLClient } from "graphql-request";

interface GetClientParams {
	isAuthenticated?: boolean;
	token?: string | null;
	tokenType?: "Access" | "Refresh";
}

export function getClient({
	isAuthenticated = true,
	token = null,
	tokenType = "Access",
}: GetClientParams): GraphQLClient {
	if (!token && isAuthenticated) {
		token = useStore.getState().auth.accessToken;
	}
	return new GraphQLClient(GRAPHQL_ENDPOINT, {
		headers: {
			authorization: `${tokenType} ${token}`,
		},
	});
}

type graphqlRequestParams<TData = any, TVariables = Record<string, any>> = {
	query: TadaDocumentNode<TData, TVariables, any>;
	variables?: TVariables;
	clientOptions?: GetClientParams;
};

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
		console.log(error);
		return {
			success: false,
			error: {
				message: error.response.errors[0].message,
				code: error.response.errors[0].extensions.code,
			},
		};
	}
}
