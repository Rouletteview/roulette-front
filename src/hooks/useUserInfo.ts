import { useQuery } from "@apollo/client";
import { GET_USER_INFO } from "../graphql/query/getUserInfo";


export const useUserInfo = () => {
    const { data, loading, error } = useQuery(GET_USER_INFO);

    return { data, loading, error };
};