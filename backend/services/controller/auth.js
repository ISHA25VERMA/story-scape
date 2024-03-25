import { addNewUser, getUsersByID } from "../model/auth.js";
import _ from "lodash";

export const fetchUserById = async (data) => {
  return _.last(await getUsersByID(data));
};

export const createUser = async (data) => {
  return _.last(await addNewUser(data));
};
