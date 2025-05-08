import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Order from "./Order";
import axios from "axios";
import { useCart } from "./CartContext";

const ProductsPage = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { quantities, handleQuantityChange } = useCart();

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

  // const handleQuantityChange = (id, price, discount, value, stock) => {
  //   let quantity = parseInt(value) || 0;
  //   if (quantity > stock) quantity = stock;
  //   const discountedPrice = price * (1 - (discount || 0) / 100);
  //   setQuantities((prev) => ({
  //     ...prev,
  //     [id]: { quantity, price: discountedPrice },
  //   }));
  // };

  const getGrandTotal = () => {
    return Object.values(quantities).reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const getSelectedItems = () => {
    const selected = [];
    Object.entries(quantities).forEach(([id, { quantity, price }]) => {
      const product = Object.values(groupedProducts)
        .flat()
        .find(item => item._id === id);

      if (product && quantity > 0) {
        selected.push({
          id: product._id, // ← Make sure this is included
          name: product.name,
          quantity,
          price,
          total: price * quantity
        });
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
        <div className="mb-1 text-center">
          <div className="sticky flex flex-col justify-center items-center top-12 bg-transparent to-red-50 text-green-900 font-bold p-4 rounded-md text-center text-2xl mb-2">
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
            {/* <h2 className="text-2xl font-bold mb-4 text-green-900">{type}</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts()[type].map((product) => {
                const { _id, image, name, price, discount_percent = 0, stock = 0 } = product;
                const outOfStock = stock === 0;

                return (
                  <div key={_id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <Link
                      to={`/products/${_id}`}
                      className="block cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={name}
                        className="h-48 w-full object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <p className="text-green-700">₹{price}</p>
                          <p className="text-red-600">{discount_percent}% off</p>
                          <p className="text-blue-700 col-span-2">
                            Stock: {stock} {outOfStock && "(Out of Stock)"}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4 border-t">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(
                            _id,
                            price,
                            discount_percent,
                            Math.max((quantities[_id]?.quantity || 0) - 1, 0),
                            stock
                          )}
                          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={outOfStock || (quantities[_id]?.quantity || 0) === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min="0"
                          max={stock}
                          value={quantities[_id]?.quantity || 0}
                          onChange={(e) => handleQuantityChange(
                            _id,
                            price,
                            discount_percent,
                            e.target.value.replace(/\D/g, ""),
                            stock
                          )}
                          className="w-20 px-3 py-2 border rounded text-center"
                          disabled={outOfStock}
                          placeholder="0"
                        />

                        <button
                          onClick={() => handleQuantityChange(
                            _id,
                            price,
                            discount_percent,
                            Math.min((quantities[_id]?.quantity || 0) + 1, stock),
                            stock
                          )}
                          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={outOfStock || (quantities[_id]?.quantity || 0) >= stock}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      {!outOfStock && (
                        <p className="text-sm mt-1 text-gray-600 text-center">
                          {/* Available: {stock} */}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
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