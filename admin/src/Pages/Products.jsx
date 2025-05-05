import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: 0,
    discount_percent: 0,
    stock: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/getall-products");
        setGroupedProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      name: product.name,
      price: product.price,
      discount_percent: product.discount_percent,
      stock: product.stock,
    });
    setIsEditing(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/update-product/${selectedProduct._id}`,
        updatedProduct
      );
      // Update the UI with the edited product
      setGroupedProducts((prevGrouped) => {
        const updatedGrouped = { ...prevGrouped };
        const productType = selectedProduct.productType;
        const updatedProductList = updatedGrouped[productType].map((product) =>
          product._id === selectedProduct._id ? response.data : product
        );
        updatedGrouped[productType] = updatedProductList;
        return updatedGrouped;
      });
      setIsEditing(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <p className="text-center mt-10">Loading Products...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Groceries Available</h1>

      {/* Product Edit Form Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="discount_percent"
                value={updatedProduct.discount_percent}
                onChange={handleChange}
                placeholder="Discount Percentage"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="stock"
                value={updatedProduct.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProduct}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {Object.keys(groupedProducts).map((type) => (
        <div key={type} className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupedProducts[type].map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-green-600 font-semibold">₹{product.price}</p>
                  <p className="text-sm text-gray-600">Discount: {product.discount_percent || 0}%</p>
                  <p className="text-sm text-gray-600">Stock: {product.stock ?? 0} available</p>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
