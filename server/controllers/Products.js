const Product = require("../models/ProductModel");

// Create a new Product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    const grouped = {};
    products.forEach((product) => {
      if (!grouped[product.productType]) {
        grouped[product.productType] = [];
      }
      grouped[product.productType].push(product);
    });

    res.status(200).json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Products", error: err });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
};
