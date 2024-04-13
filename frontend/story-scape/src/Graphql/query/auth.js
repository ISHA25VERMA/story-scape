import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query Query($ids: [ID!]!) {
    auth {
      user(ids: $ids) {
        email
        id
        name
      }
    }
  }
`;
