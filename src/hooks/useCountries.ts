import { useQuery } from "@apollo/client";
import { GET_COUNTRIES_WITH_PHONE_PREFIXES } from "../graphql/query/getCountriesWithPhone";


export const useCountries = () => {
    const { data, loading, error } = useQuery(GET_COUNTRIES_WITH_PHONE_PREFIXES);

    return { data, loading, error };
};