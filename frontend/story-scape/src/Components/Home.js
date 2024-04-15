import { React, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "./Drawer";

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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import { pink } from "@mui/material/colors";
import Chapter from "./Chapter";

function Home() {
  const { user, logout } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const loggedOut = () => {
    logout();
  };

  if (!user) {
    return <></>;
  }

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hi! {user.name}
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
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <PeopleAltIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Community"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <TrendingUpIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Popular"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <AutoStoriesIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"My Library"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <CreateIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"My Stories"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
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
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {" "}
                <SettingsIcon sx={{ color: pink[500] }} />
              </ListItemIcon>
              <ListItemText primary={"Setting"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar></Toolbar>
        <Chapter />
      </Box>
    </Box>
  );
}

export default Home;
