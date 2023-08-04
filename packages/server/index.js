const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGODB = process.env.MONGODB_URL ?? "";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: process.env.PORT || 4000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
