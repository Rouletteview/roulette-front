import { useQuery } from '@apollo/client';
import { GET_BET_QUERY } from '../../graphql/query/bet/getBet';

export const useGetBet = (betIds: string[], options = {}) => {
    return useQuery(GET_BET_QUERY, {
        variables: { request: { ids: betIds } },
        fetchPolicy: 'network-only',
        ...options,
    });
}; 