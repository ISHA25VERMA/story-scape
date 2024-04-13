import { gql } from "@apollo/client";

//login mutation
export const LOGIN_USER = gql`
  mutation LoginUser($input: UserLoginInput!) {
    auth {
      loginUser(input: $input)
    }
  }
`;
