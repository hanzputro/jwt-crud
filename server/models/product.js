const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, default: null },
  stock: { type: Number },
  buyPrice: { type: Number },
  sellPrice: { type: Number },
  image: { type: String, default: null },
});

module.exports = model("product", productSchema);
