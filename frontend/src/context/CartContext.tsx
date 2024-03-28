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
  clearCart: () => void;
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
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      console.log(updatedItems); // Check updated cart items
      return updatedItems;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
