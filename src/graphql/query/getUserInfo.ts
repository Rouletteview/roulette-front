import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUserInfo {
    GetUserInfo {
      Id
      IsAdmin
      Email
      Name
      Country
      BirthDate
      PhoneNumber
      LastLogin
    }
  }
`;