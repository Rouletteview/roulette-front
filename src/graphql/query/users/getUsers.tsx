import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($request: GetUsersRequest!) {
    GetUsers(request: $request) {
      Users {
        Id
        Name
        Email
        Country
        BirthDate
        PhoneNumber
        IsActive
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
      }
    }
  }
`;
