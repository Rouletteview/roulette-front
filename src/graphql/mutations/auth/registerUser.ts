import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterUser($registerUser: RegisterUserRequest!) {
    RegisterUser(registerUser: $registerUser) {
      Id
      Email
    }
  }
`;
