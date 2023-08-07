const userResolver = require("./user");
const tokenResolver = require("./token");
const productResolver = require("./product");

module.exports = {
  Query: {
    ...tokenResolver.Query,
    ...userResolver.Query,
    ...productResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...productResolver.Mutation,
  },
};
