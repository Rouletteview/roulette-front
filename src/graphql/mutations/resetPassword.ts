import { gql } from "@apollo/client";

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($email: String!, $newPassword: String!, $validationToken: String!) {
    ResetPassword(
      input: { Email: $email, NewPassword: $newPassword, ValidationToken: $validationToken }
    ) {
      Email
      UserId
    }
  }
`;
