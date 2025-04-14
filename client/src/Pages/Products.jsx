import { useEffect, useState } from "react";
import Order from "./Order";
import axios from "axios";

const CrackersPage = () => {
  const [groupedCrackers, setGroupedCrackers] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/getall-products")
      .then((res) => {
        setGroupedCrackers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching crackers", err);
      });
  }, []);
  const handleQuantityChange = (id, price, value) => {
    const quantity = parseInt(value) || 0;
    setQuantities((prev) => ({
      ...prev,
      [id]: { quantity, price },
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
        const cracker = Object.values(groupedCrackers)
          .flat()
          .find((item) => item._id === id);

        if (cracker) {
          selected.push({
            name: cracker.name,
            quantity,
            price,
            total: price * quantity,
          });
        }
      }
    });

    return selected;
  };
  const getFilteredCrackers = () => {
    if (!searchTerm.trim()) return groupedCrackers;

    const filtered = {};
    Object.entries(groupedCrackers).forEach(([type, crackers]) => {
      const matched = crackers.filter((cracker) =>
        cracker.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="bg-green-700 w-96 p-3 rounded-lg text-white">💰 Total Amount: ₹{getGrandTotal()}</h1>
          </div>
        </div>

        {Object.keys(getFilteredCrackers()).map((type) => (

          <div key={type} className="mb-12">
            <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
              <table className="min-w-full text-center">
                <thead className="bg-gray-100 border-b">
                  <tr className="text-gray-700">
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredCrackers()[type].map((cracker, index) => {

                    const { _id, image, name, price } = cracker;
                    const qty = quantities[_id]?.quantity || 0;
                    const total = qty * price;

                    return (
                      <tr
                        key={_id}
                        className={`hover:bg-yellow-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
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
                        <td className="p-4 text-green-700 font-semibold">
                          ₹{price}
                        </td>
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
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            className="w-20 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                          />
                        </td>
                        <td className="p-4 text-blue-800 font-semibold">
                          ₹{total}
                        </td>
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

export default CrackersPage;
