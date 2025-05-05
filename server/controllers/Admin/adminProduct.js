// controllers/admin.js
const Product = require("../../models/ProductModel");

const getAllProduct = async (req, res) => {
  try {
    const Products = await Product.find();
    const grouped = {};
    Products.forEach((product) => {
      if (!grouped[product.productType]) {
        grouped[product.productType] = [];
      }
      grouped[product.productType].push(product);
    });

    res.status(200).json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
};

module.exports = {
  getAllProduct,
};
