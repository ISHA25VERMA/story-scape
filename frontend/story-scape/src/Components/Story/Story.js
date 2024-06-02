import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Box } from "@mui/material";
import StoryNavigation from "./StoryNavigation";
import CreateStory from "./CreateStory";
import CreateChapter from "../Chapter/CreateChapter";
import { getStoryById } from "../../Graphql/cacheResults";
import NavigationBar from "../Drawer";
import NavigationBarr from "./NavigationBarr";
import { client } from "../../App";
import { STORY_BY_ID } from "../../Graphql/query/platform";
// Required for side-effects

function Story() {
  const [selectedTab, setSelectedTab] = useState("story-title");
  const load = useLoaderData();

  const variables = { storyId: load.id };
  const {
    platform: { story },
  } = client.readQuery({
    query: STORY_BY_ID,
    variables,
  });
  console.log(story);

  return (
    <Box component="main">
      <StoryNavigation
        selected={selectedTab}
        setSelectedTab={setSelectedTab}
        story={story}
        storyId={load.id}
      ></StoryNavigation>
      <Box
        position="fixed"
        sx={{
          width: `calc(100% - ${240}px)`,
          ml: `${240}px`,
        }}
        component={"content"}
      >
        {selectedTab === "story-title" ? (
          <CreateStory
            story={story}
            storyId={load.id}
            variables={variables}
          ></CreateStory>
        ) : (
          <CreateChapter
            chapterId={selectedTab}
            story={story}
            storyId={load.id}
            content={"content"}
          ></CreateChapter>
        )}
      </Box>
    </Box>
  );
}

const styles = {
  "upload-image": {
    border: "1px solid #ccc",
    display: "inline-block",
    padding: "6px 12px",
    width: "50%",
    height: "50%",
    cursor: "pointer",
  },
};

export default Story;
