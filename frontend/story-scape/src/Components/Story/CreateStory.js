import React, { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { imageDB } from "../../Firebase/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from "@mui/base";
import { useMutation } from "@apollo/client";
import { CREATE_STORY } from "../../Graphql/mutation/platform";
import { AuthContext } from "../../authContext";
// Required for side-effects

function CreateStory() {
  const [url, setUrl] = useState("");
  const [input, setInput] = useState({});
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [createStory, { data }] = useMutation(CREATE_STORY, {
    update(
      proxy,
      {
        data: {
          platform: {
            createStory: { data: Story },
          },
        },
      }
    ) {
      navigate("/addChapter");
    },
    variables: { input: { coverImageUrl: url, state: "DRAFT", ...input } },
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    createStory();
  };

  return (
    <Box component="main">
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
            <Button type="submit"> Next </Button>
          </div>
        </Box>
      </Form>
    </Box>
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
