import { addNewUser, getUserByEmail, getUsersByID } from "../model/auth.js";
import _ from "lodash";
import jwt from "jsonwebtoken";
const JWT_SECRET = "I$h@Verm@";

export const fetchUserById = async (data) => {
  return _.last(await getUsersByID(data));
};

export const createUser = async (data, user) => {
  await addNewUser(data);
  const loginData = await userLogin(data);

  return loginData;
};

export const userLogin = async (data) => {
  const { email, password } = data;
  const user = _.last(await getUserByEmail({ email }));

  if (_.isEmpty(user)) throw new Error("User does not exist");

  if (user.password != password) throw new Error("Incorrect password");

  const jwtToken = jwt.sign(
    { id: user.id, email: email, org_id: user.org_id },
    JWT_SECRET
  );

  return {
    ...user,
    token: jwtToken,
  };
};

export const jwtToken = (token) => {
  return jwt.decode(token, JWT_SECRET);
};
