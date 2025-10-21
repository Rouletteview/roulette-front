import { gql } from "@apollo/client";

export const ON_BET_UPDATE_SUBSCRIPTION = gql`
  subscription OnBetUpdate($tableId: String!) {
    OnBetUpdate(tableId: $tableId) {
      Bet {
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
      PreviousStatus
      UpdatedAt
    }
  }
`;
