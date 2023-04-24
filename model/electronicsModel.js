const mongoose = require("mongoose");

const electronicSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  discount_price: { type: Number, required: true },
  original_price: Number,
  discount: String,
  processor: String,
  battery_life: String,
  warranty: String,
  features: String,
  rating: Number,
  total_ratings: String,
  reviews: String,
  cod: String,
  brand: String,
  description: String,
  availability: String,
  category: String,
  qunatity: Number,
  visible: Boolean,
});

const ElectronicModel = mongoose.model("electronic", electronicSchema);

module.exports = { ElectronicModel };
