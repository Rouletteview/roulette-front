import { gql } from "@apollo/client";


export const START_FREE_SUBSCRIPTION_MUTATION = gql`
mutation StartFreeSubscription {
    StartFreeSubscription {
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