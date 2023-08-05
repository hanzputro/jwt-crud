const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    token: String
    products: [Product]
  }

  type Product {
    _id: ID!
    name: String
    stock: Float
    buyPrice: Float
    sellPrice: Float
    image: String
  }

  type Query {
    getUser(userId: ID!): User!
    getUsers: [User!]!
  }

  type Mutation {
    createRegister(username: String!, email: String!, password: String!): User!
    createLogin(email: String!, password: String!): User!
    createProduct(
      userId: String!
      name: String!
      stock: Float!
      buyPrice: Float!
      sellPrice: Float!
      image: String
    ): Product!

    updateProduct(
      productId: String!
      name: String
      stock: Float
      buyPrice: Float
      sellPrice: Float
      image: String
    ): Product!

    deleteProduct(productId: String!): Product!
  }
`;
