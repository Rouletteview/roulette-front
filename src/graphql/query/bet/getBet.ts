import { gql } from "@apollo/client";

export const GET_BET_QUERY = gql`
    query GetBetsBatch($request: GetBetsBatchRequest!) {
        GetBetsBatch(request: $request) {
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