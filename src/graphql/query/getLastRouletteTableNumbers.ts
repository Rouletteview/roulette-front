import { gql } from '@apollo/client';



export const GET_LAST_ROULETTE_TABLE_NUMBERS = gql`
query GetLastRouletteTableNumbers($TableId: String!, $Limit: Int!) {
    GetLastRouletteTableNumbers(
        request: { TableId: $TableId, Limit: $Limit }
    ) {
        Number
    }
}


`;