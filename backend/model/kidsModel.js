const mongoose = require("mongoose");

const kidsSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  rating: Number,
  discount_price: { type: Number, required: true },
  original_price: Number,
  discount: String,
  heading: String,
  cod: String,
  gender: { type: String, required: true },
  category: String,
  qunatity: Number,
  visible: Boolean,
});

const KidsModel = mongoose.model("kid", kidsSchema);

module.exports = { KidsModel };
