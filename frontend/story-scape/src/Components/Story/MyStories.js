import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../Drawer";
import AddIcon from "@mui/icons-material/Add";
const drawerWidth = 240;

function MyStories() {
  return (
    <div>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <NavigationBar selected="MY_STORIES" />
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
      </Box>
    </div>
  );
}

export default MyStories;
