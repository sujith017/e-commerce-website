const Payment = require("../models/PaymentModel");

// Store Razorpay payment details
const savePaymentDetails = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      customer_name,
      customer_email,
    } = req.body;

    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      customer_name,
      customer_email,
    });

    await payment.save();
    res.status(201).json({ message: "Payment saved successfully", payment });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  savePaymentDetails,
};
