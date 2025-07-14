import { useQuery } from '@apollo/client';
import { GET_BET_QUERY } from '../../graphql/query/bet/getBet';

export const useGetBet = (betId: string, options = {}) => {
    return useQuery(GET_BET_QUERY, {
        variables: { id: betId },
        fetchPolicy: 'network-only',
        ...options,
    });
}; 