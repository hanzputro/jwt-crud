const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: { type: String },
  stock: { type: Number },
  buyPrice: { type: Number },
  sellPrice: { type: Number },
  image: { type: Number },
});

module.exports = model("product", productSchema);
