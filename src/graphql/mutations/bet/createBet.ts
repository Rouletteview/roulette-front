import { gql } from "@apollo/client";

export const CREATE_BET_MUTATION = gql`
    mutation CreateBet($input: CreateBetRequest!) {
        CreateBet(input: $input) {
            id
            amount
            gameType
            value
            status
            createdAt
            table {
                Id
                Name
                Provider
                IsOnline
            }
        }
    }
`;