import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations/auth/loginUser";

export const useLogin = () => {
  const [Login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  return { Login, data, loading, error };
};