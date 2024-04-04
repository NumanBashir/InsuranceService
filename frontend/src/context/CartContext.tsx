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
      // Check if the item already exists in the cart
      const itemExists = prevItems.some(
        (cartItem) => cartItem._id === item._id
      );
      if (itemExists) {
        // Item already exists, don't add it again
        alert("This item is already in your cart");
        return prevItems;
      } else {
        // Item doesn't exist, add it to the cart
        return [...prevItems, item];
      }
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
