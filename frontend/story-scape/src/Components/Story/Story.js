import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate, useLoaderData } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import StoryNavigation from "./StoryNavigation";
import CreateStory from "./CreateStory";
import Chapter from "../Chapter";
import CreateChapter from "../Chapter/CreateChapter";
import { useMutation, useQuery } from "@apollo/client";
import { STORY_BY_ID } from "../../Graphql/query/platform";
import { client } from "../../App";
import { getStoryById } from "../../Graphql/cacheResults";
// Required for side-effects

function Story() {
  const [selectedTab, setSelectedTab] = useState("story-title");
  const load = useLoaderData();

  const [story, setStory] = useState(useLoaderData);

  console.log("s", story);
  return (
    <Box component="main">
      <StoryNavigation
        selected={selectedTab}
        setSelectedTab={setSelectedTab}
        story={story}
        storyId={load.id}
        setStory={setStory}
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
            setStory={setStory}
          ></CreateStory>
        ) : (
          <CreateChapter
            chapterId={selectedTab}
            story={story}
            storyId={load.id}
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
