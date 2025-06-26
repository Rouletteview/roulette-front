import { gql } from '@apollo/client';

export const GET_ROULETTE_TABLES = gql`
  query GetRouletteTables($Query: String!, $Skip: Int!, $Limit: Int!) {
    GetRouletteTables(
      request: {
        Providers: ["evolution", "pragmatic", "ezugi"]
        Query: $Query
        Limit: $Limit
         IsOnline: true
        Skip: $Skip
      }
    ) {
      Tables {
        Id
        Name
        Provider
      }
      Providers
      Total
    }
  }
`;
