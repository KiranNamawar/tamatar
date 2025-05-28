import { useStore } from "@/hooks/useStore";
import { ErrorCode, GRAPHQL_ENDPOINT, type Return } from "@shared/constant";
import { createServerFn } from "@tanstack/react-start";
import { getHeader } from "@tanstack/react-start/server";
import type { TadaDocumentNode } from "gql.tada";
import { GraphQLClient } from "graphql-request";
import { graphql } from "./graphql";

const refreshQuery = graphql(`
	mutation RefreshToken($token: String!) {
		refresh(refreshToken: $token)
	}`);

const refresh = createServerFn({
	method: "POST",
}).handler(async () => {});

interface GetClientParams {
	isAuthenticated?: boolean;
	token?: string | null;
	env?: "server" | "client";
}

export function getClient({
	isAuthenticated = true,
	token = null,
	env = "client",
}: GetClientParams): GraphQLClient {
	if (!token && isAuthenticated) {
		if (env === "client") {
			token = useStore.getState().auth.accessToken;
		} else if (env === "server") {
			token = getHeader("Authorization")?.replace("Bearer ", "") ?? null;
		}
	}
	return new GraphQLClient(GRAPHQL_ENDPOINT, {
		headers: {
			authorization: `Bearer ${token}`,
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
		if (error.response.errors[0].extensions.code === ErrorCode.INVALID_JWT) {
		}
		return {
			success: false,
			error: {
				message: error.response.errors[0].message,
				code: error.response.errors[0].extensions.code,
			},
		};
	}
}
