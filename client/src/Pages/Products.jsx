import { useEffect, useState } from "react";
import Order from "./Order";
import axios from "axios";

const ProductsPage = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/getall-products")
      .then((res) => {
        setGroupedProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, []);

  const handleQuantityChange = (id, price, discount, value, stock) => {
    let quantity = parseInt(value) || 0;
    if (quantity > stock) quantity = stock;
    const discountedPrice = price * (1 - (discount || 0) / 100);
    setQuantities((prev) => ({
      ...prev,
      [id]: { quantity, price: discountedPrice },
    }));
  };

  const getGrandTotal = () => {
    return Object.values(quantities).reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const getSelectedItems = () => {
    const selected = [];
    Object.entries(quantities).forEach(([id, { quantity, price }]) => {
      if (quantity > 0) {
        const product = Object.values(groupedProducts)
          .flat()
          .find((item) => item._id === id);

        if (product) {
          selected.push({
            name: product.name,
            quantity,
            price,
            total: price * quantity,
          });
        }
      }
    });
    return selected;
  };

  const getFilteredProducts = () => {
    if (!searchTerm.trim()) return groupedProducts;

    const filtered = {};
    Object.entries(groupedProducts).forEach(([type, products]) => {
      const matched = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matched.length > 0) {
        filtered[type] = matched;
      }
    });

    return filtered;
  };

  const handleCheckout = () => {
    const selectedItems = getSelectedItems();
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }
    setShowOrderPopup(true);
  };

  const closePopup = () => {
    setShowOrderPopup(false);
  };

  return (
    <div className="pt-16 px-8 relative">
      <div className="p-6 bg-gradient-to-br from-yellow-50 to-red-50 min-h-screen">
        <div className="sticky flex flex-col justify-center items-center top-12 bg-transparent to-red-50 text-green-900 font-bold p-4 rounded-md text-center text-2xl mb-2">
          <div className="mb-1 text-center">
            <input
              type="text"
              placeholder="🔍 Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-xl px-2 py-2 text-lg bg-white border border-black-500 bg-red-100 text-black-800 placeholder-black-400 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-black-400 transition duration-300"
            />
          </div>
          <div className="text-center">
            <h1 className="bg-green-700 w-96 p-3 rounded-lg text-white">
              💰 Total Amount: ₹{getGrandTotal().toFixed(2)}
            </h1>
          </div>
        </div>

        {Object.keys(getFilteredProducts()).map((type) => (
          <div key={type} className="mb-12">
            <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
              <table className="min-w-full text-center">
                <thead className="bg-gray-100 border-b">
                  <tr className="text-gray-700">
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Discount</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredProducts()[type].map((product, index) => {
                    const { _id, image, name, price, discount_percent = 0, stock = 0 } = product;
                    const discountedPrice = price * (1 - discount_percent / 100);
                    const qty = quantities[_id]?.quantity || 0;
                    const total = qty * discountedPrice;
                    const outOfStock = stock === 0;

                    return (
                      <tr
                        key={_id}
                        className={`hover:bg-yellow-50 ${
                          outOfStock
                            ? "bg-red-100 text-red-700 font-semibold"
                            : index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        }`}
                      >
                        <td className="p-4">
                          <img
                            src={image}
                            alt={name}
                            className="h-20 w-20 object-cover mx-auto rounded shadow-md"
                          />
                        </td>
                        <td className="p-4 text-lg font-medium">{name}</td>
                        <td className="p-4 text-green-700 font-semibold">₹{price}</td>
                        <td className="p-4 text-red-600 font-medium">{discount_percent}%</td>
                        <td className="p-4 text-blue-700">{stock}</td>
                        <td className="p-4">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={qty}
                            onChange={(e) =>
                              handleQuantityChange(
                                _id,
                                price,
                                discount_percent,
                                e.target.value.replace(/\D/g, ""),
                                stock
                              )
                            }
                            className="w-20 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                            disabled={outOfStock}
                          />
                          {/* Uncomment below to show max stock warning
                          {qty >= stock && stock > 0 && (
                            <div className="text-xs text-red-500 mt-1">
                              Max stock reached
                            </div>
                          )} */}
                        </td>
                        <td className="p-4 text-blue-800 font-semibold">₹{total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="text-center mt-10">
          <button
            onClick={handleCheckout}
            className="bg-green-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-xl shadow-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Order Popup Modal */}
      {showOrderPopup && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.48)] flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Order
              selectedItems={getSelectedItems()}
              totalAmount={getGrandTotal()}
              closePopup={closePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
