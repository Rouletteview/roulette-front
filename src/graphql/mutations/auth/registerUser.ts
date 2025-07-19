import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation RegisterUser(
    $FirstName: String!
    $LastName: String!
    $Password: String!
    $Email: String!
    $Country: String!
    $BirthDate: DateTime!
    $PhoneNumber: String!
  ) {
    RegisterUser(
      registerUser: {
        FirstName: $FirstName
        LastName: $LastName
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
