import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-router-dom";

function Chapter() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  return (
    <div>
      <Form>
        <TextField
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <TextField
          multiline
          variant="standard"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </Form>
    </div>
  );
}

export default Chapter;
