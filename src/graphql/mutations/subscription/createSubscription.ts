import { gql } from "@apollo/client";


export const CREATE_SUBSCRIPTION_MUTATION = gql`
mutation CreateSubscription($input: CreateSubscriptionRequest!) {
    CreateSubscription(
        input: $input
    ) {
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
`