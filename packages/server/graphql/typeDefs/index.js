const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
  }

  type Product {
    name: String
    stock: Int
    buyPrice: Int
    sellPrice: Int
    image: String
  }

  input InputRegister {
    username: String
    email: String
    password: String
  }

  input InputLogin {
    email: String
    password: String
  }

  input InputProduct {
    name: String
    stock: Int
    buyPrice: Int
    sellPrice: Int
    image: String
  }

  type Query {
    user: User
    product(id: ID!): Product
  }

  type Mutation {
    inputRegister(inputRegister: InputRegister): User
    inputLogin(inputLogin: InputLogin): User
    inputProduct(inputProduct: InputProduct): Product

    updateProduct(id: ID!, updateProduct: InputProduct): Product

    deleteProduct(id: ID!): Product
  }
`;
