import { gql } from "@apollo/client";

export const GET_USER_SUBSCRIPTION_PAYMENTS_HISTORY_QUERY = gql`
  query GetUserSubscriptionPaymentHistory($userId: String!) {
    GetUserSubscriptionPaymentHistory(userId: $userId) {
      SubscriptionId
      PaymentId
      Status
      Reference
      PaidAt
      PaymentMethod
      Frequency
    }
  }
`;