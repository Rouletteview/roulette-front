import { gql } from "@apollo/client";

export const GET_BET_QUERY = gql`
    query GetBet($request: GetBetRequest!) {
        GetBet(request: $request) {
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