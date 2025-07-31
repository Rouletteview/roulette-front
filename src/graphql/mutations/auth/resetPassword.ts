import { gql } from "@apollo/client";

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordRequest!) {
    ResetPassword(input: $input) {
      Email
      UserId
    }
  }
`;
