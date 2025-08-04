import { gql } from "@apollo/client";

export const UPDATE_USER_ACTIVATE_STATUS_MUTATION = gql`
  mutation UpdateUserActiveStatus($userId: String!, $isActive: Boolean!) {
    UpdateUserActiveStatus(
      userId: $userId
      isActive: $isActive
    ) 
  }
`;