const { model, Schema, Types } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, unique: true },
  stock: { type: Number },
  buyPrice: { type: Number },
  sellPrice: { type: Number },
  image: { type: String },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Product", productSchema);
