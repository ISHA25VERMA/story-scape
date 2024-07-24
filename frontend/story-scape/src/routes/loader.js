import _ from "lodash";
import { client } from "../App";
import { CREATE_STORY } from "../Graphql/mutation/platform";
import { STORY_BY_ID } from "../Graphql/query/platform";

export const createStory = async (props) => {
  let { storyId } = props;
  console.log("props ", props);
  if (_.isNil(storyId)) {
    const response = await client.mutate({
      mutation: CREATE_STORY,
      variables: {
        input: { title: "", coverImageUrl: "", genre: "", state: "DRAFT" },
      },
    });
    storyId = response.data.platform.createStory.data.id;
  }

  const story = await client.query({
    query: STORY_BY_ID,
    variables: { storyId },
  });

  return story.data.platform.story;
};
