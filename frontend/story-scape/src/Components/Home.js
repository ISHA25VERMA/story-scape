import { React, useEffect, useContext, useState } from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Drawer";

import Box from "@mui/material/Box";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MyStories from "./Dashboards/MyStories";

// return (
//   <Box component="main">
//     <StoryNavigation
//       selected={selectedTab}
//       setSelectedTab={setSelectedTab}
//       story={story}
//       storyId={load.id}
//     ></StoryNavigation>
//     <Box
//       position="fixed"
//       sx={{
//         width: `calc(100% - ${240}px)`,
//         ml: `${240}px`,
//       }}
//       component={"content"}
//     >
//       {selectedTab === "story-title" ? (
//         <CreateStory
//           story={story}
//           storyId={load.id}
//           variables={variables}
//         ></CreateStory>
//       ) : (
//         <CreateChapter
//           chapterId={selectedTab}
//           story={story}
//           storyId={load.id}
//           content={"content"}
//         ></CreateChapter>
//       )}
//     </Box>
//   </Box>
// );

function Home() {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("POPULAR");

  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <NavigationBar
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      ></NavigationBar>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${240}px)`,
          ml: `${240}px`,
        }}
      ></AppBar>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Hi! {user.name}
        </Typography>
      </Toolbar>
      {mapComponent[selectedTab]}
    </div>
    // <Box
    //   component="main"
    //   sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    // >
    //   <NavigationBar
    //     setSelectedTab={setSelectedTab}
    //     selectedTab={selectedTab}
    //   />
    //   <AppBar
    //     position="fixed"
    //     sx={{
    //       width: `calc(100% - ${240}px)`,
    //       ml: `${240}px`,
    //     }}
    //   >
    //     <Toolbar>
    //       <Typography variant="h6" noWrap component="div">
    //         Hi! {user.name}
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}

const mapComponent = {
  COMMUNITY: <MyStories></MyStories>,
  POPULAR: <MyStories></MyStories>,
  MY_LIBRARY: <MyStories></MyStories>,
  MY_STORIES: <MyStories></MyStories>,
  WRITING_CONTEST: <MyStories></MyStories>,
  SETTINGS: <MyStories></MyStories>,
};

export default Home;
