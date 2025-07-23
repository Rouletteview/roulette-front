import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations/auth/loginUser";

export const useLogin = () => {
  const [Login, { data, loading, error }] = useMutation(LOGIN_MUTATION)
  console.log(error);

  return { Login, data, loading, error };
};