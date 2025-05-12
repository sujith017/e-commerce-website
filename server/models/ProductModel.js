const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  image: String,
  
  discount_percent: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Product", ProductSchema);
