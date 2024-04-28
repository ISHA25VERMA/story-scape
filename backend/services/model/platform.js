import _ from "lodash";
import db from "../db.js";

export const addStory = async (data) => {
  return await db("platform.story").insert(data).returning("*");
};

export const editStory = async (data) => {
  const { updateData, id } = data;
  return await db("platform.story")
    .update(updateData)
    .where("id", id)
    .returning("*");
};

export const getStories = async (data) => {
  const { ids, filters } = data;
  const query = db("platform.story")
    .select("*")
    .where("is_deleted", false)
    .whereIn("id", ids);

  if (_.get(filters, "createdBy", "") != "") {
    query.where("created_by", filters.createdBy);
  }
  return await query;
};

export const getStoryChapters = async (data) => {
  const { id } = data;
  const query = db("platform.map_story_chapter as msc")
    .select("c.*")
    .innerJoin("platform.chapter as c", function () {
      this.on("msc.fk_chapter_id", "c.id").on(
        "c.is_deleted",
        db.raw("?", false)
      );
    })
    .where("msc.fk_story_id", id);

  return await query;
};

export const addChapter = async (data) => {
  return await db("platform.chapter").insert(data).returning("*");
};

export const addStoryChapterMap = async (data) => {
  return await db("platform.map_story_chapter").insert(data).returning("*");
};

export const updateChapter = async (data) => {
  const { updateData, id } = data;
  const res = await db("platform.chapter")
    .update(updateData)
    .where("id", id)
    .returning("*");
  return res[0];
};
