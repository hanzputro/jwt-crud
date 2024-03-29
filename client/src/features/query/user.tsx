import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      email
    }
  }
`;
