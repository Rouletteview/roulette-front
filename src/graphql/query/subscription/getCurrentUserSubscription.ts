import { gql } from "@apollo/client";


export const GET_CURRENT_USER_SUBSCRIPTION_QUERY = gql`
query GetCurrentUserSubscription {
    GetCurrentUserSubscription {
        Id
        UserId
        IsActive
        Frequency
        EndDate
        StartDate
        LastPay
        CreatedAt
        FreeTrial
        FreeTrialTableId
    }
}

`