const express = require("express");
const { createProduct,getAllProduct } = require("../controllers/Products");

const router = express.Router();

router.post("/add-product", createProduct);
router.get("/getall-products",getAllProduct);

module.exports = router;
