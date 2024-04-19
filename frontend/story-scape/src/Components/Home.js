import { React, useEffect, useContext } from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Drawer";

import Box from "@mui/material/Box";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Home() {
  const { user } = useContext(AuthContext);

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
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <NavigationBar selected="POPULAR" />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${240}px)`,
          ml: `${240}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Hi! {user.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Home;
