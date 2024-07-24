import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import { pink } from "@mui/material/colors";
import Chapter from "./Chapter";
import { Link } from "react-router-dom";
import { AuthContext } from "../authContext";

const drawerWidth = 240;

function NavigationBar(props) {
  const { name, selectedTab, setSelectedTab } = props;
  const { logout } = useContext(AuthContext);
  const loggedOut = () => {
    logout();
  };

  const changeMainPage = (e) => {
    setSelectedTab(e.target.offsetParent.id);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hi! {name}
          </Typography>
        </Toolbar>
      </AppBar>
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
          <ListItem id={"COMMUNITY"} onClick={changeMainPage} disablePadding>
            <ListItemButton selected={selectedTab === "COMMUNITY"}>
              <ListItemIcon>
                {" "}
                <PeopleAltIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Community"} />
            </ListItemButton>
          </ListItem>
          <ListItem id={"POPULAR"} onClick={changeMainPage} disablePadding>
            <ListItemButton selected={selectedTab === "POPULAR"}>
              <ListItemIcon>
                {" "}
                <TrendingUpIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Popular"} />
            </ListItemButton>
          </ListItem>
          <ListItem id={"MY_LIBRARY"} onClick={changeMainPage} disablePadding>
            <ListItemButton selected={selectedTab === "MY_LIBRARY"}>
              <ListItemIcon>
                {" "}
                <AutoStoriesIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"My Library"} />
            </ListItemButton>
          </ListItem>

          <ListItem id={"MY_STORIES"} onClick={changeMainPage} disablePadding>
            <ListItemButton selected={selectedTab === "MY_STORIES"}>
              <ListItemIcon>
                {" "}
                <CreateIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"My Stories"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            id={"WRITING_CONTEST"}
            onClick={changeMainPage}
            disablePadding
          >
            <ListItemButton selected={selectedTab === "WRITING_CONTEST"}>
              <ListItemIcon>
                {" "}
                <EmojiEventsIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Writing Contest"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem id={"SETTING"} onClick={changeMainPage} disablePadding>
            <ListItemButton selected={selectedTab === "SETTING"}>
              <ListItemIcon>
                {" "}
                <SettingsIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={changeMainPage} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <PeopleAltIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <Link to={"/login"} onClick={loggedOut}>
                Logout
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default NavigationBar;
