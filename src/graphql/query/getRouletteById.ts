import { gql } from '@apollo/client';



export const GET_ROULETTE_BY_ID = gql`
query SimulateBet {
    SimulateBet(input: { RouletteId: "67fd3865f3b913ee91c31526", NumbersQty: 15 }) {
        RouletteId
        LastNumbers {
            Number
            WinAt
        }
        GameProbabilities {
            GameType
            Probabilities {
                Key
                Probability
            }
        }
    }
}


`;