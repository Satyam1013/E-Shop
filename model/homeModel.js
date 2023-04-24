const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  discount_price: Number,
  original_price: Number,
  discount: String,
  processor: String,
  rating: Number,
  battery_life: String,
  warranty: String,
  features: String,
  rating: Number,
  total_ratings: String,
  reviews: String,
  cod: String,
  description: String,
  availability: String,
});

const HomeModel = mongoose.model("home", homeSchema);

module.exports = { HomeModel };
