// routes/crackerRoutes.js
const express = require("express");
const { getAllProduct } = require("../controllers/Admin/adminProduct");
const { getAllOrders } = require('../controllers/Admin/adminOrders');

const router = express.Router();

router.get("/product", getAllProduct);
router.get("/order", getAllOrders);

module.exports = router;
