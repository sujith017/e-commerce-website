const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/Order");

router.post("/place-order", placeOrder);

module.exports = router;
