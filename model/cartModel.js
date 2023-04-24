const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  discount_price: Number,
  qunatity: Number,
  userID: String,
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
