import { gql } from '@apollo/client';

export const GET_ROULETTE_TABLES_PROBABILITIES = gql`
 query GetRouletteTableProbabilities($TableId: String!, $GameType: GameType!, $StartDate: DateTime!, $EndDate: DateTime!) {
    GetRouletteTableProbabilities(
        request: {
            TableId: $TableId
            GameType: $GameType
            StartDate: $StartDate
            EndDate: $EndDate
        }
    ) {
        Date
        Tag
        Value
    }
}

`;
