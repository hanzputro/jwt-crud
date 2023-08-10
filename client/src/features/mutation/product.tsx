import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation Mutation(
    $userId: String!
    $name: String!
    $stock: Float!
    $buyPrice: Float!
    $sellPrice: Float!
    $image: String
  ) {
    createProduct(
      userId: $userId
      name: $name
      stock: $stock
      buyPrice: $buyPrice
      sellPrice: $sellPrice
      image: $image
    ) {
      _id
      name
      stock
      buyPrice
      sellPrice
      image
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation Mutation(
    $productId: String!
    $name: String
    $stock: Float
    $buyPrice: Float
    $sellPrice: Float
    $image: String
  ) {
    updateProduct(
      productId: $productId
      name: $name
      stock: $stock
      buyPrice: $buyPrice
      sellPrice: $sellPrice
      image: $image
    ) {
      _id
      name
      stock
      buyPrice
      sellPrice
      image
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation Mutation($productId: String!) {
    deleteProduct(productId: $productId) {
      _id
      name
      stock
      buyPrice
      sellPrice
      image
    }
  }
`;
