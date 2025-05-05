import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-10">Loading Products...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Groceries Available
      </h1>
      {Object.keys(groupedProducts).map((type) => (
        <div key={type} className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupedProducts[type].map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-green-600 font-semibold">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    Discount: {product.discount_percent || 0}%
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {product.stock ?? 0} available
                  </p>
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
