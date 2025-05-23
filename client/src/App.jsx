import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Order from "./Pages/Order";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import AddProduct from "./Pages/AddProduct";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider
// import PrivateRoute from "./src/components/PrivateRoute";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { CartProvider } from './Pages/CartContext';

import ProductDetailsPage from './Pages/ProductDetailsPage';


function App() {
  return (
    <AuthProvider> {/* Wrap the app in AuthProvider to provide authentication context */}
      <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          {/* <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> */}
          <Route path="/booking" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* Protect the AddProduct route with PrivateRoute */}
          {/* <Route path="/add-product" element={<AddProduct />} /> */}

          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
