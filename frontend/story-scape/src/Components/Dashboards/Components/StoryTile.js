import _ from "lodash";
import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
function StoryTile(props) {
  const { story } = props;
  const { id, title, author, coverImageUrl } = story;

  const imageUrl =
    "https://i.pinimg.com/originals/b7/0c/5f/b70c5f97d31e72afaed922985391d650.jpg";
  // const imageUrl = !_.isEmpty(coverImageUrl)
  //   ? coverImageUrl
  // : "https://firebasestorage.googleapis.com/v0/b/story-scape-71cc8.appspot.com/o/no%20cover%20image.svg?alt=media&token=e96b266e-571a-4a7b-922e-bb0791d06fe8";
  const storyTitle = !_.isEmpty(title) ? title : "NEW STORY BLA BLA BLA";
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        width: "fit-content",
        position: "relative",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          style={{
            width: "150px",
            height: "180px",
            borderRadius: "10px",
          }}
          src={imageUrl}
          alt="cover img"
        ></img>
        <Link to={`story/${id}`} props={{ edit: true }}>
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              background: "#508C9B",
              borderRadius: "20px",
              width: "40px",
              height: "40px",
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <EditIcon
              style={{
                "margin-left": "auto",
                "margin-right": "auto",
                // width: 50%;
              }}
            />
          </div>
        </Link>
      </div>
      <div style={{ width: "150px" }}>{storyTitle}</div>
    </div>
  );
}

export default StoryTile;
