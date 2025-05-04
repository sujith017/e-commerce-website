import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/products/add-product', {
        name: form.name,
        price: parseFloat(form.price),
        image: form.image,
      });
      setMessage('Product added successfully!');
      setForm({ name: '', price: '', image: '' });
    } catch (error) {
      setMessage('Failed to add product');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Product</h2>
        {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
