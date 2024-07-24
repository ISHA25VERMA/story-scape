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

export const STORY_BY_USER_IDS = gql`
  query getUserStories($ids: [ID!]!, $storyFilters: StoryFiltersInput) {
    auth {
      user(ids: $ids) {
        stories(StoryFilters: $storyFilters) {
          id
          title
          state
          coverImageUrl
          genre
          chapters {
            id
            text
            title
            createdBy {
              id
              name
              email
            }
          }
        }
      }
    }
  }
`;
