import resolvers from "./resolvers.js";
// Update with your config settings.
import { dirname } from "path";
import { fileURLToPath } from "url";

import _ from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const querySchema = loadFilesSync(
  path.join(__dirname, "../schema/query/*.graphql"),
  {
    recursive: true,
  }
);

const muatationSchema = loadFilesSync(
  path.join(__dirname, "../schema/mutations/*.graphql"),
  {
    recursive: true,
  }
);

// Import and merge the schema files
const typeDefs = mergeTypeDefs([querySchema, muatationSchema]);
export default { typeDefs, resolvers };
