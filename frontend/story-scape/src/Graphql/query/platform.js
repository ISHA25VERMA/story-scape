import { gql } from "@apollo/client";

export const STORY_BY_ID = gql`
  query story($storyId: ID!) {
    platform {
      story(id: $storyId) {
        id
        title
        state
        chapters {
          createdBy {
            id
          }
          id
          text
          title
        }
        coverImageUrl
        createdBy {
          id
        }
        genre
      }
    }
  }
`;
