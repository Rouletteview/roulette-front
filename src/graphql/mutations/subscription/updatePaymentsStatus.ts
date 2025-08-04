import { gql } from "@apollo/client";

export const UPDATE_PAYMENTS_STATUS_MUTATION = gql`
  mutation UpdatePaymentStatus($input: UpdatePaymentStatusRequest!) {
    UpdatePaymentStatus(
      input: $input
    ) 
  }
`;