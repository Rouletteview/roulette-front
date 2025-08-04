import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: String!) {
    GetUser(userId: $userId) {
      Id
      Name
      Email
      BirthDate
      PhoneNumber
      Country
      Subscription {
        Id
        UserId
        IsActive
        Frequency
        EndDate
        StartDate
        LastPay
        CreatedAt
        Payments {
          Id
          PhotoUrl
          Reference
          Status
          PaymentMethod
          CreatedAt
        }
      }
      IsActive
      LastLogin
      CreatedAt
    }
  }
`;
