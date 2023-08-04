const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Product = require("../../models/Product");

module.exports = {
  Query: {
    product: (id) => Product.findById(id),
  },

  Mutation: {
    async inputProduct(
      _,
      { inputProduct: { name, stock, buyPrice, sellPrice, image } }
    ) {
      const newProduct = new Product({
        name: name,
        stock: stock,
        buyPrice: buyPrice,
        sellPrice: sellPrice,
        image: image,
      });

      const res = await newProduct.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async updateProduct(
      _,
      { id, updateProduct: { name, stock, buyPrice, sellPrice, image } }
    ) {
      // find product
      const product = await Product.findOne({ id });
      if (!product) {
        throw new ApolloError("Product not exist!");
      }

      const updateProduct = new Product({
        name: name,
        stock: stock,
        buyPrice: buyPrice,
        sellPrice: sellPrice,
        image: image,
      });

      const res = await product.updateOne({ id }, { updateProduct });

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteProduct(_, { id }) {
      // find product
      const product = await Product.findOne({ id });
      if (!product) {
        throw new ApolloError("Product not exist!");
      }

      // delete product
      product.remove();

      return null;
    },
  },
};
