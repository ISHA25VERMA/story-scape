import { Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-router-dom";
function Story() {
  const [title, setTitle] = useState("");
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
      </Form>
    </div>
  );
}
