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
          placeholder="Title"
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
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
