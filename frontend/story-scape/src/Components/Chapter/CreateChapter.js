import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-router-dom";
function CreateChapter() {
  const [input, setInput] = useState("");

  return (
    <div>
      <Box component="main">
        <Form>
          <TextField
            onChange={(e) => {
              setInput({ ...input, title: e.target.value });
            }}
            fullWidth
            placeholder="Description"
            multiline
            minRows={10}
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              setInput({ ...input, text: e.target.value });
            }}
            fullWidth
            placeholder="Description"
            multiline
            minRows={10}
            variant="standard"
          />
        </Form>
      </Box>
    </div>
  );
}

export default CreateChapter;
