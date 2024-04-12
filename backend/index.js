import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import express from "express";
import db from "./services/db.js";
import schema from "./schema/index.js";
import { jwtToken } from "./services/controller/auth.js";

const router = express.Router();

const app = express();
const port = 4000;

const server = new ApolloServer(schema);

const { url } = await startStandaloneServer(server, {
  listen: { port },
  context: async ({ req, res }) => {
    return {
      user: jwtToken(req.headers.authorization),
    };
  },
});
console.log(url);
