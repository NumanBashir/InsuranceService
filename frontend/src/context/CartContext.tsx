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
  const [cartItems, setCartItems] = useState<Service[]>([]);
  const [isDuplicateItem, setDuplicateItem] = useState(false);

  const addToCart = (item: Service) => {
    const itemExists = cartItems.some((cartItem) => cartItem._id === item._id);
    if (itemExists) {
      setDuplicateItem(true);
    } else {
      // Item doesn't exist, add it to the cart
      setCartItems((prevItems) => [...prevItems, item]);
      if (isDuplicateItem) setDuplicateItem(false);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
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
