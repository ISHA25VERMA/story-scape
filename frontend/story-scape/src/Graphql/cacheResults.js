import { client } from "../App";
import { STORY_BY_ID } from "./query/platform";

export const getStoryById = (data) => {
  console.log("fecthing", data);
  const { storyId } = data;
  const d = client.readQuery({
    query: STORY_BY_ID,
    variables: { storyId: storyId },
  });

  if (d) {
    return d.platform.story;
  }
  return null;
};
