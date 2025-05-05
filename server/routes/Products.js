const express = require("express");
const { createProduct,getAllProduct } = require("../controllers/Products");
const { updateProduct } = require("../controllers/Admin/updateProduct");

const router = express.Router();

router.post("/add-product", createProduct);
router.get("/getall-products",getAllProduct);
router.put("/update-product/:id", updateProduct);
module.exports = router;
