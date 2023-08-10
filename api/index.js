const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();
const app = express();

const MONGODB = process.env.MONGODB_URL ?? "";

// create a new server object via the http module's
const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  mongoose
    .set("strictQuery", false)
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`MongoDB Connected`);
    })
    .catch((err) => {
      console.log(err.message);
    });

  const ORIGIN_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/graphql`
    : `http://localhost:3000`;

  app.use(
    "/api/graphql",
    cors({ origin: ORIGIN_URL, credentials: true }),
    // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
      introspections: true,
      context: async ({ req, res }) => {
        // validating token before access to resolvers
        // create token for login (1h) and token for data (30s)
        const accessToken = req?.headers?.authorization || "";

        return {
          req,
          res,
          accessToken,
        };
      },
    })
  );
};

startApolloServer(app, httpServer);

module.exports = httpServer;
