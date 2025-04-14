const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number,
  currency: { type: String, default: "INR" },
  status: { type: String, default: "Success" },
  customer_name: String,
  customer_email: String,
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
