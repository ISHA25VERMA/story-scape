import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import express from "express";
import db from "./services/db.js";
import schema from "./schema/index.js";

const router = express.Router();

const app = express();
const port = 3000;

const server = new ApolloServer(schema);

const { url } = await startStandaloneServer(server, {
  listen: { port },
});
console.log(url);
