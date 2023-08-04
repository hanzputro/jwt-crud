const userResolver = require("./user");
const productResolver = require("./product");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...productResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...productResolver.Mutation,
  },
};
