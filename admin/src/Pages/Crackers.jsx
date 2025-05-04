import React, { useEffect, useState } from "react";
import axios from "axios";

const Crackers = () => {
  const [groupedCrackers, setGroupedCrackers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrackers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/getall-products");
        setGroupedCrackers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching crackers:", err);
        setLoading(false);
      }
    };

    fetchCrackers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading crackers...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
      groceries available
      </h1>
      {Object.keys(groupedCrackers).map((type) => (
        <div key={type} className="mb-10">
          {/* <h2 className="text-2xl font-semibold mb-4">{type}</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {groupedCrackers[type].map((cracker) => (
              <div
                key={cracker._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={cracker.image}
                  alt={cracker.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{cracker.name}</h3>
                  <p className="text-green-600 font-semibold">
                    ₹{cracker.price}
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

export default Crackers;
