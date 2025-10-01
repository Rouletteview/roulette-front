import { gql } from "@apollo/client";

export const ON_ROULETTE_NUMBER_UPDATE_SUBSCRIPTION = gql`
  subscription OnRouletteNumberUpdate(
    $gameType: GameType!
    $probabilitiesResultLimit: Int
    $tableId: String
  ) {
    OnRouletteNumberUpdate(
      gameType: $gameType
      probabilitiesResultLimit: $probabilitiesResultLimit
      tableId: $tableId
    ) {
      TableId
      Timestamp
      Result {
        Date
        Tag
        Number
      }
      TableId
      Timestamp
      Probabilities {
        Tag
        Value
        Count
      }
    }
  }
`;