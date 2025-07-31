import { useQuery } from '@apollo/client';
import { GET_BET_QUERY } from '../../graphql/query/bet/getBet';

export const useGetBet = (betId: string, options = {}) => {
    return useQuery(GET_BET_QUERY, {
        variables: { request: { id: betId } },
        fetchPolicy: 'network-only',
        ...options,
    });
}; 