import React, { createContext, useContext, ReactNode, useState } from "react";

interface Service {
  _id: string;
  name: string;
  price: number;
}

interface CartContextType {
  cartItems: Service[];
  addToCart: (item: Service) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Service[]>([]);

  const addToCart = (item: Service) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
