import _ from "lodash";
import db from "../db.js";
import {
  addChapter,
  addStory,
  addStoryChapterMap,
  editStory,
  getStories,
  getStoryChapters,
  updateChapter,
} from "../model/platform.js";

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
  const { id, jwtUser } = data;
  const updateData = {
    title: data.title,
    cover_image_url: data.coverImageUrl,
    state: data.state,
    genre: data.genre,
    updated_at: db.fn.now(),
  };
  try {
    const story = await editStory({ updateData, id });
    return { data: story[0], isSuccess: true };
  } catch (err) {
    return { isSuccess: false, warning: err.toString() };
  }
};

export const getStoryById = async (data) => {
  const { id } = data;
  const res = await getStories({ ids: [id] });
  return res[0];
};

//add functionality to add chapter number
export const createChapter = async (data) => {
  const { title, text, storyId, jwtUser } = data;
  //create chapter
  const chapter = _.last(
    await addChapter({
      text,
      title,
      created_at: db.fn.now(),
      created_by: jwtUser.id,
    })
  );
  //map chapter to story
  const map = await addStoryChapterMap({
    fk_story_id: storyId,
    fk_chapter_id: chapter.id,
    created_at: db.fn.now(),
  });
  return { chapter, isSuccess: true };
};

export const fetchStoryChapters = async (data) => {
  return await getStoryChapters(data);
};

export const editChapter = async (data) => {
  const updateData = {
    title: data.title,
    text: data.text,
  };

  const res = await updateChapter({ updateData, id: data.id });
  return { chapter: res, isSuccess: true };
};
