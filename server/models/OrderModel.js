const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
