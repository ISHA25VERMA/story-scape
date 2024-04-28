import { gql } from "@apollo/client";

export const Chapter = gql`
  fragment Chapter on Chapter {
    createdBy {
      id
    }
    id
    text
    title
  }
`;

export const CREATE_STORY = gql`
  ${Chapter}
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
          chapters {
            ...Chapter
          }
        }
      }
    }
  }
`;

export const UPDATE_STORY = gql`
  ${Chapter}
  mutation UpdateStory($input: UpdateStoryInput!) {
    platform {
      updateStory(input: $input) {
        data {
          id
          title
          coverImageUrl
          state
          genre
          createdBy {
            id
          }
          chapters {
            ...Chapter
          }
        }
        isSuccess
        warning
      }
    }
  }
`;

export const CREATE_CHAPTER = gql`
  ${Chapter}
  mutation createChapterMutation($input: CreateChapterInput!) {
    platform {
      createChapter(input: $input) {
        chapter {
          ...Chapter
        }
        isSuccess
      }
    }
  }
`;

export const UPDATE_CHAPTER = gql`
  ${Chapter}
  mutation Platform($input: UpdateChapterInput!) {
    platform {
      updateChapter(input: $input) {
        chapter {
          ...Chapter
        }
        isSuccess
        warning
      }
    }
  }
`;
