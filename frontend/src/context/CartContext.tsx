import { createContext, useContext, ReactNode, useState } from "react";

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
  isDuplicateItem: boolean;
  setDuplicateItem: (isDuplicate: boolean) => void;
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
  const [cartItems, setCartItems] = useState<Service[]>(() => {
    const localData = localStorage.getItem("cartItems");
    return localData ? JSON.parse(localData) : [];
  });
  const [isDuplicateItem, setDuplicateItem] = useState(false);

  const addToCart = (item: Service) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some(
        (cartItem) => cartItem._id === item._id
      );

      if (itemExists) {
        setDuplicateItem(true);
        return prevItems;
      } else {
        setDuplicateItem(false);
        const updatedCartItems = [...prevItems, item];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.filter((item) => item._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isDuplicateItem,
        setDuplicateItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
