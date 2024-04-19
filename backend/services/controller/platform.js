import db from "../db.js";
import { addStory } from "../model/platform.js";

export const createStory = async (data) => {
  const { jwtUser } = data;
  const storyData = {
    title: data.title,
    cover_image_url: data.coverImageUrl,
    state: data.state,
    genre: data.genre,
    created_by: jwtUser.id,
  };

  try {
    const story = await addStory(storyData);
    return { data: story[0], isSuccess: true };
  } catch (err) {
    return { isSuccess: false, warning: err.toString() };
  }
};

export const updateStory = async (data) => {
  const updateData = {
    title: data.title,
    cover_image_url: data.coverImageUrl,
    state: data.state,
    genre: data.genre,
  };
  return await addStory({ updateData, id: data.id });
};
