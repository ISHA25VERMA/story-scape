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
  const { filters } = data;
  const query = db("platform.stories as")
    .select("*")
    .where("is_deleted", false);

  if (_.get(filters, "createdBy", "") != "") {
    query.where("created_by", filters.createdBy);
  }
  return await query;
};
