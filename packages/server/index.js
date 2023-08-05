const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pkg = require("body-parser");
const http = require("http");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

dotenv.config();
const app = express();

const MONGODB = process.env.MONGODB_URL ?? "";

// create a new server object via the http module's
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
}).then(({ url }) => {
  mongoose
    .set("strictQuery", false)
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`MongoDB Connected`);
      console.log(`🚀 Server ready at ${url}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
