import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  query Query {
    refreshToken {
      accessToken
    }
  }
`;
