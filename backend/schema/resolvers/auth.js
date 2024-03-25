import { fetchUserById, createUser } from "../../services/controller/auth.js";
import GraphQLJSON from "graphql-type-json";

export default {
  Query: {
    auth: () => {
      return {};
    },
  },
  Mutation: {
    auth: () => {
      return {};
    },
  },
  AuthMutation: {
    createNewUser: async (parent, { input }) => {
      return await createUser(input);
    },
  },
  AuthQuery: {
    user: async (parent, input) => {
      const res = await fetchUserById(input);
      console.log(res);
      return res;
    },
  },
  User: {
    name: ({ name }) => name,
    email: ({ email }) => email,
    id: ({ id }) => id,
    role: ({ role }) => role,
    organization: ({ org_id }) => {},
  },
};
