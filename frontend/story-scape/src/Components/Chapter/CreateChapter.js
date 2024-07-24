import { useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import _ from "lodash";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import { UPDATE_CHAPTER, UPDATE_STORY } from "../../Graphql/mutation/platform";
function CreateChapter(props) {
  const { story, chapterId } = props;
  const [input, setInput] = useState("");
  const chapterData = _.find(story.chapters, { id: chapterId });
  const [chapter, setChapter] = useState(chapterData);

  const [updateChapter, { data }] = useMutation(UPDATE_CHAPTER, {
    update(
      cache,
      {
        data: {
          platform: {
            updateChapter: { chapter },
          },
        },
      }
    ) {
      setChapter(chapter);
      console.log(cache);
    },
    variables: { input: { id: chapter.id, ...input } },
  });
  const updateChapterDetails = (e) => {
    e.preventDefault();
    updateChapter();
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        overflow: "scroll",
        height: "650px",
        "overflow-y": "scroll",
        "overflow-x": "hidden",
        padding: "20px 20px",
      }}
    >
      <div component="main">
        <Form onSubmit={updateChapterDetails}>
          <TextField
            onChange={(e) => {
              setInput({ ...input, title: e.target.value });
            }}
            defaultValue={chapter.title}
            fullWidth
            placeholder="Title"
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              setInput({ ...input, text: e.target.value });
            }}
            fullWidth
            placeholder="Text"
            multiline
            minRows={25}
            variant="standard"
            defaultValue={chapter.text}
          />
          <Button type="submit">SAVE</Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateChapter;
