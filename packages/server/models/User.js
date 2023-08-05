const { model, Schema, Types } = require("mongoose");

const userSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  products: {
    type: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },
});

module.exports = model("User", userSchema);
