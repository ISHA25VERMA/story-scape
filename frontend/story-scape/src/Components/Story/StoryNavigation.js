import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { pink } from "@mui/material/colors";
import _ from "lodash";
import { useMutation } from "@apollo/client";
import { CREATE_CHAPTER, Chapter } from "../../Graphql/mutation/platform";
import { STORY_BY_ID } from "../../Graphql/query/platform";

const drawerWidth = 240;

function StoryNavigation(props) {
  const { setSelectedTab, selected, storyId, story } = props;
  const chapters = story.chapters;

  const changeMainPage = (e) => {
    if (e.target.offsetParent.classList.contains("chapter")) {
      setSelectedTab(e.target.offsetParent.id);
    } else {
      setSelectedTab("story-title");
    }
  };

  const [createChapter, { data }] = useMutation(CREATE_CHAPTER, {
    update(
      cache,
      {
        data: {
          platform: {
            createChapter: { chapter },
          },
        },
      }
    ) {
      cache.modify({
        id: cache.identify(story),
        fields: {
          chapters(existingChapters = [], { readField }) {
            const newChapter = cache.writeFragment({
              data: chapter,
              fragment: Chapter,
            });

            if (
              existingChapters.some(
                (ref) => readField("id", ref) === newChapter.id
              )
            ) {
              return existingChapters;
            }

            return [...existingChapters, newChapter];
          },
        },
      });
      setSelectedTab(chapter.id);
    },
    // fetchPolicy: "cache-only",
    refetchQueries: [{ query: STORY_BY_ID, variables: { storyId } }],
    variables: {
      input: { storyId, title: "CHAPTER TITLE", text: "" },
    },
  });

  const addChapter = () => {
    createChapter();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              id="story-title"
              onClick={changeMainPage}
              selected={selected === "story-title"}
            >
              <ListItemIcon>
                {" "}
                <PeopleAltIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={story.title} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {!_.isEmpty(story.chapters) &&
            story.chapters.map((chapter, index) => (
              <ListItem
                className={"chapter"}
                id={chapter.id}
                onClick={changeMainPage}
                key={chapter.id}
                disablePadding
              >
                <ListItemButton selected={selected === chapter.id}>
                  <ListItemText primary={chapter.title} />
                </ListItemButton>
              </ListItem>
            ))}
          <ListItem onClick={addChapter} disablePadding>
            <ListItemButton>
              <ListItemText primary={"Add Chapter"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default StoryNavigation;
