import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      _id
      name
      stock
      buyPrice
      sellPrice
      image
      user {
        _id
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Query($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      name
      stock
      buyPrice
      sellPrice
      image
      user {
        _id
      }
    }
  }
`;
