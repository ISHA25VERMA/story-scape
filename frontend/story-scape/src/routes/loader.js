import { client } from "../App";
import { CREATE_STORY } from "../Graphql/mutation/platform";
import { STORY_BY_ID } from "../Graphql/query/platform";

export const createStory = async () => {
  const response = await client.mutate({
    mutation: CREATE_STORY,
    variables: {
      input: { title: "", coverImageUrl: "", genre: "", state: "DRAFT" },
    },
  });

  const story = await client.query({
    query: STORY_BY_ID,
    variables: { storyId: response.data.platform.createStory.data.id },
  });

  return story.data.platform.story;
};
