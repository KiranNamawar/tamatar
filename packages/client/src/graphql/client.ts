import useAuth from "@/hooks/useAuth";
import { GraphQLClient } from "graphql-request";

export const getClient = () => {
    const url = 'http://localhost:4000/graphql';
    const { accessToken } = useAuth.getState();

    return new GraphQLClient(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}