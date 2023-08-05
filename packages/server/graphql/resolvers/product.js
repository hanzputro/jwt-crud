const { Types } = require("mongoose");

const User = require("../../models/User");
const Product = require("../../models/Product");

module.exports = {
  Mutation: {
    async createProduct(
      _,
      { userId, name, stock, buyPrice, sellPrice, image }
    ) {
      const newProduct = new Product({
        userId,
        name,
        stock,
        buyPrice,
        sellPrice,
        image,
      });
      const createdProduct = await newProduct.save();
      const user = await User.findById(Types.ObjectId(userId));
      user.products.push(createdProduct._id);
      await user.save();

      return createdProduct;
    },

    async updateProduct(
      _,
      { productId, name, stock, buyPrice, sellPrice, image }
    ) {
      const editedProduct = await Product.findById(Types.ObjectId(productId));
      await editedProduct.update({
        name,
        stock,
        buyPrice,
        sellPrice,
        image,
      });

      return editedProduct;
    },

    async deleteProduct(_, { productId }) {
      const deleteProduct = await Product.findById(Types.ObjectId(productId));
      await deleteProduct.delete();

      return deleteProduct;
    },
  },
};
