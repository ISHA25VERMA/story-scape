import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function MyStories() {
  return (
    <div>
      <Link to="/story">
        <Button>Create New</Button>
      </Link>
    </div>
  );
}

export default MyStories;
