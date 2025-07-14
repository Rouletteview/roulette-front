import { gql } from "@apollo/client";


export const GET_BET_QUERY = gql`
    query GetBet($id: String!) {
        GetBet(request: {id: $id}) {
            status
            value
        }
    }
`;