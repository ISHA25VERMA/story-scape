import _ from "lodash";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolverArray = await loadFiles(path.join(__dirname, "./resolvers/*.js"));

export default mergeResolvers(resolverArray);
