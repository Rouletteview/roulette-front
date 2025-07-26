import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterUser(
    $Name: String!
    $Password: String!
    $Email: String!
    $Country: String!
    $BirthDate: DateTime!
    $PhoneNumber: String!
  ) {
    RegisterUser(
      registerUser: {
        Name: $Name
        Password: $Password
        Email: $Email
        Country: $Country
        BirthDate: $BirthDate
        PhoneNumber: $PhoneNumber
      }
    ) {
      Id
      Email
    }
  }
`;
