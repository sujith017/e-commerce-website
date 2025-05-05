const Product = require("../../models/ProductModel");

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, discount_percent, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, discount_percent, stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err });
  }
};

module.exports = {
  updateProduct,
};
