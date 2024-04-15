import {
  fetchUserById,
  createUser,
  userLogin,
} from "../../services/controller/auth.js";
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
    createNewUser: async (parent, { input }, { user }) => {
      return await createUser(input, user);
    },
    loginUser: async (parent, { input }) => {
      return await userLogin(input);
    },
  },
  AuthQuery: {
    user: async (parent, input) => {
      const res = await fetchUserById(input);
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
