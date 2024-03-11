import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { db } from "./services/db.js";

const server = new ApolloServer({
  typeDefs: gql`
    type User {
      name: String
    }
  `,
  resolvers: { Query: { name: () => "Isha" } },
});
const app = express();
const port = 3000;
server.applyMiddleware({ app });
app.get("/", async function (req, res) {
  return;
  res.send("go to /graphql");
});
app.listen(port, () => {
  console.log(`Example
app listening on port ${port}`);
});
