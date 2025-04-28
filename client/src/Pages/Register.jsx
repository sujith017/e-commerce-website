import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage({ text: "Registration successful! You can now log in.", type: "success" });
    } catch (err) {
      setMessage({ text: "Registration failed. Try again.", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Register</h2>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold"
        >
          Register
        </button>
        {message.text && (
          <p
            className={`mt-4 text-center ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
