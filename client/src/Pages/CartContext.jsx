import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, price, discount, value, stock) => {
    let quantity = parseInt(value) || 0;
    if (quantity > stock) quantity = stock;
    const discountedPrice = price * (1 - (discount || 0) / 100);
    setQuantities((prev) => ({
      ...prev,
      [id]: { quantity, price: discountedPrice },
    }));
  };

  return (
    <CartContext.Provider value={{ quantities, handleQuantityChange ,  setQuantities, }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);