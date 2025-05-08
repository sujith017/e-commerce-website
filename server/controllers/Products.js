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
const getSingleProduct =  async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id); // Find product by ID

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const updateStock = async (req, res) => {
  try {
    const { items } = req.body;
    
    // Update stock for each item
    const bulkOperations = items.map(item => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { stock: -item.quantity } }
      }
    }));

    await Product.bulkWrite(bulkOperations);
    res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock', error });
  }
};
module.exports = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateStock,
};
