import React, { createContext, useContext, useState } from "react";
import { TnewProduct } from "../../../Entity/product";

interface CartContextType {
  cart: TnewProduct[];
  addToCart: (product: TnewProduct) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<TnewProduct[]>([]);

  const addToCart = (product: TnewProduct) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const cartContextValue: CartContextType = {
    cart,
    addToCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
