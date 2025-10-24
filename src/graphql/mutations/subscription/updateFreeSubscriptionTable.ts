import { gql } from "@apollo/client";

export const UPDATE_FREE_SUBSCRIPTION_TABLE_MUTATION = gql`
  mutation UpdateFreeSubscriptionTable($input: UpdateFreeSubscriptionTableRequest!) {
    UpdateFreeSubscriptionTable(input: $input) {
      Id
      UserId
      IsActive
      Frequency
      EndDate
      StartDate
      LastPay
      CreatedAt
    }
  }
`;

