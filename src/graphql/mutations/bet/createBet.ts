import { gql } from "@apollo/client";


export const CREATE_BET_MUTATION = gql`
    mutation CreateBet($input: CreateBetRequest!) {
        CreateBet(input: $input) {
            id
            rouletteTableId
            value
            status
        }
    }
`