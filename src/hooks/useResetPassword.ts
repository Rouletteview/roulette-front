import { useMutation } from "@apollo/client";
import { RESET_PASSWORD_MUTATION } from "../graphql/mutations/resetPassword";

export const useResetPassword = () => {
  const [ResetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD_MUTATION);

  return { ResetPassword, data, loading, error };
};