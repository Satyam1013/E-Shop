const mongoose = require("mongoose");

const womenSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  discount_price: { type: Number, required: true },
  original_price: Number,
  discount: String,
  heading: String,
  offer: String,
  cod: String,
  availability: String,
  category: String,
  qunatity: Number,
  visible: Boolean,
});

const WomenModel = mongoose.model("women", womenSchema);

module.exports = { WomenModel };
