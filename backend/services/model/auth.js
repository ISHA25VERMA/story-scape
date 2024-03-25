import db from "../db.js";

export const getUsersByID = async (data) => {
  const { ids } = data;
  const res = await db("auth.users").select("*").whereIn("id", ids);
  return res;
};

export const addNewUser = async (data) => {
  console.log(data);
  const insertData = {
    name: data.name,
    org_id: data.orgId,
    email: data.email,
    role: data.role,
  };
  return await db("auth.users").insert(insertData).returning("*");
};
