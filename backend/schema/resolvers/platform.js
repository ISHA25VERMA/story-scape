import _ from "lodash";
import { fetchUserById } from "../../services/controller/auth.js";
import {
  createChapter,
  createStory,
  editChapter,
  fetchStoryChapters,
  getStoryById,
  updateStory,
} from "../../services/controller/platform.js";
import { getStories } from "../../services/model/platform.js";

export default {
  Query: {
    platform: () => {
      return {};
    },
  },
  Mutation: {
    platform: () => {
      return {};
    },
  },
  PlatformMutation: {
    createStory: async (parent, { input }, { user }) => {
      return await createStory({ ...input, jwtUser: user });
    },
    updateStory: async (parent, { input }, { user }) => {
      return await updateStory({ ...input, jwtUser: user });
    },
    createChapter: async (parent, { input }, { user }) => {
      return await createChapter({ ...input, jwtUser: user });
    },
    updateChapter: async (parent, { input }, { user }) => {
      return await editChapter(input);
    },
  },
  PlatformQuery: {
    stories: async (parent, { input }, { user }) => {
      return await getStories({ ...input, jwtUser: user });
    },
    story: async (parent, { id }, { user }) => {
      return await getStoryById({ id, jwtUser: user });
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
    chapters: async (parent, { id }, { user }) => {
      return await fetchStoryChapters({ id: parent.id });
    },
  },
  Chapter: {
    id: ({ id }) => id,
    text: ({ text }) => text,
    title: ({ title }) => title,
    createdBy: async (parent, args, { user }) => {
      return await fetchUserById({ ids: [parent.created_by] });
    },
  },
};
