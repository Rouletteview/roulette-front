import { gql } from "@apollo/client";

export const ACTIVATE_USER = gql`
mutation ActivateUser($token: String!) {
    ActivateUser(user: { ValidationToken: $token }) {
        Email
        Id
    }
}
`;