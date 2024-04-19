import { gql } from "@apollo/client";

export const CREATE_STORY = gql`
  mutation Mutation($input: CreateStoryInput!) {
    platform {
      createStory(input: $input) {
        data {
          id
          title
          createdBy {
            id
          }
          genre
          state
          coverImageUrl
        }
      }
    }
  }
`;

export const CREATE_CHAPTER = gql`
  
`
