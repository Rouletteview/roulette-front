import { gql } from '@apollo/client';

export const GET_ROULETTE_TABLES_PROBABILITIES = gql`
query GetRouletteTableProbabilities($request: GetRouletteTableProbabilitiesRequest!) {
    GetRouletteTableProbabilities(
        request: $request
    ) {
        Probabilities {
            Tag
            Value
            Count
        }
        Results {
            Date
            Tag
            Number
        }
    }
}


`;
