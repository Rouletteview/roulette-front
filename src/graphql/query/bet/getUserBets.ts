import { gql } from "@apollo/client";

export const GET_USER_BETS_QUERY = gql`
    query GetUserBets($request: GetUserBetsRequest!) {
        GetUserBets(request: $request) {
            id
            amount
            gameType
            value
            status
            createdAt
            table {
                Name
                Provider
            }
        }
    }
`;