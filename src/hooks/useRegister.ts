import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../graphql/mutations/registerUser";

export const useRegister = () => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  return { registerUser, data, loading, error };
};