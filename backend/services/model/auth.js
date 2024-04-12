import db from "../db.js";

export const getUsersByID = async (data) => {
  const { ids } = data;
  const res = await db("auth.users").select("*").whereIn("id", ids);
  return res;
};

export const getUserByEmail = async (data) => {
  const { email } = data;
  const res = await db("auth.users")
    .select("*")
    .where("email", db.raw("?", email));
  return res;
};

export const addNewUser = async (data) => {
  const insertData = {
    name: data.name,
    org_id: data.orgId,
    email: data.email,
    role: data.role,
    password: data.password,
  };
  return await db("auth.users").insert(insertData).returning("*");
};
