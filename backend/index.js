import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import express from "express";
import db from "./services/db.js";

const router = express.Router();

const app = express();
const port = 3000;

const server = new ApolloServer({
  typeDefs: `
    type Query {
      name: String
    }
  `,
  resolvers: { Query: { name: () => "Isha" } },
});

const { url } = await startStandaloneServer(server, {
  listen: { port },
});
