import { useQuery } from "@apollo/client";
import { GET_ROULETTE_BY_ID } from "../graphql/query/getRouletteById";


export const useRouletteById = () => {
    const { data, loading, error } = useQuery(GET_ROULETTE_BY_ID, {
        pollInterval: 5000
    });

    return { data, loading, error };
};