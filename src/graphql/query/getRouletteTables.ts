import { gql } from '@apollo/client';

export const GET_ROULETTE_TABLES = gql`
  query GetRouletteTables($request: GetRouletteTablesRequest!) {
    GetRouletteTables(request: $request) {
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
