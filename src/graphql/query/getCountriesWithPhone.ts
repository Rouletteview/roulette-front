import { gql } from '@apollo/client';

export const GET_COUNTRIES_WITH_PHONE_PREFIXES = gql`
  query {
    GetCountriesWithPhonePrefixes {
      Country
      PhonePrefix
    }
  }
`;