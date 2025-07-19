import { useMutation } from "@apollo/client";
import { SEND_RESET_PASSWORD_EMAIL } from "../graphql/mutations/auth/sendResetPasswordEmail";

export const useSendResetPassword = () => {
  const [SendResetPasswordEmail, { data, loading, error }] = useMutation(SEND_RESET_PASSWORD_EMAIL);

  return { SendResetPasswordEmail, data, loading, error };
};