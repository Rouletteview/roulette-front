import { gql } from "@apollo/client";

export const ACTIVATE_USER = gql`
mutation ActivateUser($user: ActivateUserRequest!) {
    ActivateUser(user: $user) {
        Email
        Id
    }
}
`;