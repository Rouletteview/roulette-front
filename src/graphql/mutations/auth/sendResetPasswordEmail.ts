import { gql } from "@apollo/client";

export const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation SendResetPasswordEmail($email: String!) {
    SendResetPasswordEmail(email: $email)
  }
`;