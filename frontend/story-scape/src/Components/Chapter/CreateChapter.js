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
    <div>
      <Box component="main">
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
            placeholder="Description"
            multiline
            minRows={10}
            variant="standard"
            defaultValue={chapter.text}
          />
          <Button type="submit">SAVE</Button>
        </Form>
      </Box>
    </div>
  );
}

export default CreateChapter;
