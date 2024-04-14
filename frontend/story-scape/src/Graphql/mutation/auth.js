import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Auth($input: CreateUserInput!) {
    auth {
      createNewUser(input: $input) {
        email
        id
        name
        token
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: UserLoginInput!) {
    auth {
      loginUser(input: $input) {
        email
        id
        name
        token
      }
    }
  }
`;
