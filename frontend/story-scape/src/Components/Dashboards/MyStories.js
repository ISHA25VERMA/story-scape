import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import StoryTile from "./Components/StoryTile";
import { STORY_BY_USER_IDS } from "../../Graphql/query/platform";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../authContext";
import _ from "lodash";
const drawerWidth = 240;

function MyStories() {
  //use query fetch for frtching user stories
  const { user } = useContext(AuthContext);

  const [storyState, setStoryState] = useState("DRAFT");
  const { loading, error, data } = useQuery(STORY_BY_USER_IDS, {
    variables: {
      ids: user.id,
      storyFilters: {
        state: storyState,
      },
    },
  });

  while (loading) return <div>loading</div>;
  // const {auth: {}}
  console.log(storyState);
  console.log(data);
  const stories = _.get(data, "auth.user.stories", []);
  console.log(stories);
  // data.auth.user.stories ? data.auth.user.stories : [];
  // console.log(storyState);
  // console.log(data);
  // console.log(stories);
  // console.log(user);

  // fetch published and draft seperately

  return (
    <div>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            display: {
              xs: "flex",
            },
          }}
        >
          <Toolbar>
            {/* <IconButton 
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Stories
            </Typography>

            <Button color="inherit">
              <Link to="/story">
                <AddIcon />
                Add New
              </Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            width: `calc(100% - ${320}px)`,
            ml: `${240}px`,
            "overflow-y": "scroll",
            "overflow-x": "hidden",
            overflow: "scroll",
          }}
          position="absolute"
          display="flex"
          flexDirection="column"
          component={"content"}
        >
          <div>
            <select
              name="Status"
              onChange={(event) => {
                // console.log(event.target.selectedOptions[0].value);
                setStoryState(event.target.selectedOptions[0].value);
              }}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              // "grid-template-columns": "repeat(auto-fit, minmax(20px, 1fr))",
              // "grid-template-columns": "repeat(auto-fit,minmax(200px, 1fr))",
              // "grid-auto-rows": "minmax(100px, auto)",
              // "grid-auto-rows": "100px",

              flexFlow: "wrap",
              paddingTop: "20px",
            }}
          >
            {stories.map((element) => {
              console.log(element);
              return <StoryTile story={element}></StoryTile>;
            })}
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default MyStories;
