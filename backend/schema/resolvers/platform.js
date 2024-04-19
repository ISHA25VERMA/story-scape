import { fetchUserById } from "../../services/controller/auth.js";
import { createStory } from "../../services/controller/platform.js";
import { getStories } from "../../services/model/platform.js";

export default {
  Query: {},
  Mutation: {
    platform: () => {
      return {};
    },
  },
  PlatformMutation: {
    createStory: async (parent, { input }, { user }) => {
      return await createStory({ ...input, jwtUser: user });
    },
    createChapter: async (parent, { input }, { user }) => {
      return await createChapter(input);
    },
  },
  PlatformQuery: {
    stories: async (parent, { input }, { user }) => {
      return await getStories({ ...input, jwtUser: user });
    },
  },
  Story: {
    id: ({ id }) => id,
    title: ({ title }) => title,
    coverImageUrl: ({ cover_image_url }) => cover_image_url,
    createdBy: async (parent, args, { user }) => {
      return await fetchUserById({ ids: [parent.created_by] });
    },
    genre: ({ genre }) => genre,
    state: ({ state }) => state,
  },
  Chapter: {
    id: ({ id }) => id,
    text: ({ text }) => text,
    createdBy: async (parent, args, { user }) => {
      return await fetchUserById({ ids: [parent.createdBy] });
    },
  },
};
