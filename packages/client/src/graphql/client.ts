import { useAuth } from '@/hooks/useAuth';
import { GraphQLClient } from 'graphql-request';


export function getClient() {
    const token = useAuth.getState().accessToken;

    const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
    if (!endpoint) {
        throw new Error('VITE_GRAPHQL_ENDPOINT is not defined');
    }
    
    return new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
}