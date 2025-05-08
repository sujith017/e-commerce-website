import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { quantities, handleQuantityChange } = useCart();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="pt-16 px-8 min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
            <div className="max-w-4xl mx-auto p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    ← Back
                </button>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                    <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <p className="text-lg">Price: ₹{product.price}</p>
                        <p className="text-lg text-red-600">Discount: {product.discount_percent}%</p>
                        <p className="text-lg text-blue-700">Stock: {product.stock}</p>
                        <div className="col-span-2">
                            <label className="block mb-2">Quantity:</label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantityChange(
                                        product._id,
                                        product.price,
                                        product.discount_percent,
                                        Math.max((quantities[product._id]?.quantity || 0) - 1, 0),
                                        product.stock
                                    )}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={product.stock === 0 || (quantities[product._id]?.quantity || 0) === 0}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>

                                <input
                                    type="number"
                                    min="0"
                                    max={product.stock}
                                    value={quantities[product._id]?.quantity || 0}
                                    onChange={(e) => handleQuantityChange(
                                        product._id,
                                        product.price,
                                        product.discount_percent,
                                        e.target.value.replace(/\D/g, ""), // Allow only numbers
                                        product.stock
                                    )}
                                    className="w-20 px-3 py-1 border rounded text-center"
                                    disabled={product.stock === 0}
                                />

                                <button
                                    onClick={() => handleQuantityChange(
                                        product._id,
                                        product.price,
                                        product.discount_percent,
                                        Math.min((quantities[product._id]?.quantity || 0) + 1, product.stock),
                                        product.stock
                                    )}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={product.stock === 0 || (quantities[product._id]?.quantity || 0) >= product.stock}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                            {product.stock > 0 && (
                                <p className="text-sm mt-1 text-gray-600 text-center">
                                    {/* Available: {product.stock} */}
                                </p>
                            )}
                            <p className="mt-4 text-xl font-bold">
                                Total: ₹{((quantities[product._id]?.quantity || 0) * product.price * (1 - product.discount_percent / 100)).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;