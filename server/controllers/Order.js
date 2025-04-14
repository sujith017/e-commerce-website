const Order = require("../models/OrderModel");

const placeOrder = async (req, res) => {
  try {
    const { name, phone, address, items } = req.body;

    if (!name || !phone || !address || !items || !items.length) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newOrder = new Order({ name, phone, address, items });
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

module.exports = {
  placeOrder,
};
