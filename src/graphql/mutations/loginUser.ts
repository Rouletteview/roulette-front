import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login(
    $Email: String!
    $Password: String!
  ) {
    Login(
      user: {
        Email: $Email
        Password: $Password
      }
    ) {
      Token
#     Email
    }
  }
`;
