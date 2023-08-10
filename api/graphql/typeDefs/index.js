const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    refreshToken: String
  }

  type Product {
    _id: ID!
    name: String
    stock: Float
    buyPrice: Float
    sellPrice: Float
    image: String
    user: User
  }

  type accessToken {
    accessToken: String
  }

  type refreshToken {
    refreshToken: String
  }

  type Query {
    refreshToken: accessToken!

    getUser(userId: ID!): User!
    getUsers: [User!]!

    getProduct(productId: ID!): Product!
    getProducts: [Product!]!
  }

  type Mutation {
    loginUser(email: String!, password: String!): accessToken!
    logoutUser: refreshToken!

    createUser(username: String!, email: String!, password: String!): User!
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
