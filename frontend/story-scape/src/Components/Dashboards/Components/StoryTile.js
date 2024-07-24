import React from "react";

function StoryTile(props) {
  const { title, author, coverImage } = props;

  const imageUrl =
    coverImage != null || coverImage !== undefined
      ? coverImage
      : "https://i.pinimg.com/originals/b7/0c/5f/b70c5f97d31e72afaed922985391d650.jpg";
  return (
    <div style={{ padding: 0, margin: 0, width: "fit-content" }}>
      <img
        style={{ width: "150px", height: "180px", borderRadius: "10px" }}
        src="https://i.pinimg.com/originals/b7/0c/5f/b70c5f97d31e72afaed922985391d650.jpg"
        alt="cover img"
      ></img>
      <div style={{ width: "fit-content" }}>Title</div>

      {author != null || author !== undefined ? <div>Author</div> : <div></div>}
    </div>
  );
}

export default StoryTile;
