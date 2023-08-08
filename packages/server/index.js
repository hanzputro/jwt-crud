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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  app.use(
    "/graphql",
    cors({ origin: true, credentials: true }),
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

  mongoose
    .set("strictQuery", false)
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`MongoDB Connected`);

      httpServer.listen({ port: 4000 });
      console.log(`🚀 Server ready at  http://localhost:4000/graphql`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
