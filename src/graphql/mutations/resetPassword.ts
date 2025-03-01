import { gql } from "@apollo/client";

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($newPassword: String!, $validationToken: String!) {
    ResetPassword(
      input: { NewPassword: $newPassword, ValidationToken: $validationToken }
    ) {
      Email
      UserId
    }
  }
`;
