import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [price] = useState(20);

  return (
    <CartContext.Provider value={{ isPaymentModalOpen, setIsPaymentModalOpen, price }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
