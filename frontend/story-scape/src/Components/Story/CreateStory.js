import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { imageDB } from "../../Firebase/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from "@mui/base";
import { useMutation } from "@apollo/client";
import { UPDATE_STORY } from "../../Graphql/mutation/platform";
import { client } from "../../App";
import { STORY_BY_ID } from "../../Graphql/query/platform";
import { getStoryById } from "../../Graphql/cacheResults";

function CreateStory(props) {
  const { storyId, story } = props;

  const [input, setInput] = useState({});
  //   const [story, setStory] = useState(props.story);
  const [url, setUrl] = useState(story.coverImageUrl);

  const uploadImage = async (e) => {
    const fileItem = e.target.files[0];
    const filename = fileItem.name;

    const imageRef = ref(imageDB, `cover_images/${filename}`);
    const uploadTask = uploadBytesResumable(imageRef, fileItem);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log("url : ", downloadUrl);
          setUrl(downloadUrl);
        });
      }
    );
  };

  const [updateStory, { data }] = useMutation(UPDATE_STORY, {
    update(
      cache,
      {
        data: {
          platform: {
            updateStory: { data },
          },
        },
      }
    ) {},
    refetchQueries: [{ query: STORY_BY_ID, variables: { storyId } }],
    variables: { input: { ...input, id: storyId, coverImageUrl: url } },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("save");
    updateStory();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        sx={{
          bgcolor: "background.default",
          p: 3,
          height: "100%",
          display: "flex",
        }}
      >
        <div>
          {url === "" && (
            <input
              style={styles["upload-image"]}
              name="coverImageUrl"
              type="file"
              alt="hello"
              onChange={uploadImage}
            ></input>
          )}
          {url !== "" && (
            <img style={styles["upload-image"]} alt="cover" src={url}></img>
          )}
        </div>
        <div>
          <TextField
            onChange={(e) => {
              setInput({ ...input, title: e.target.value });
            }}
            fullWidth
            defaultValue={story.title}
            placeholder="Story Title"
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              setInput({ ...input, genre: e.target.value });
            }}
            fullWidth
            placeholder="Genre"
            variant="standard"
          />
          <TextField
            // onChange={(e) => {
            //   setInput({ ...input, description: e.target.value });
            // }}
            fullWidth
            placeholder="Description"
            multiline
            minRows={10}
            variant="standard"
          />
          <Button type="submit"> SAVE </Button>
        </div>
      </Box>
    </Form>
  );
}

const styles = {
  "upload-image": {
    border: "1px solid #ccc",
    display: "inline-block",
    padding: "6px 12px",
    width: "50%",
    height: "50%",
    cursor: "pointer",
  },
};

export default CreateStory;
