import { useMutation } from "@apollo/client"
import { CREATE_BET_MUTATION } from "../../../../graphql/mutations/bet/createBet";

interface Props {
    rouletteTableId: string;
    amount: number;
    gameType: string;
    value: string;
}
export const useBetData = ({ rouletteTableId, amount, gameType, value }: Props) => {


    const [createBet, { data, loading: createBetLoading, error: createBetError }] = useMutation(CREATE_BET_MUTATION, {
        variables: {
            input: {
                rouletteTableId: rouletteTableId,
                amount: amount,
                gameType: gameType,
                value: value,
            }
        }
    });

    console.log(data);

    return {
        createBet,
        createBetLoading,
        createBetError
    }

}