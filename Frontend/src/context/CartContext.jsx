import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    try {
      const response = await api.get("/cart");

      console.log("Cart API Response:", response.data);

      if (Array.isArray(response.data)) {
        setCartCount(response.data.length);
      } else if (response.data?.cartItems) {
        setCartCount(response.data.cartItems.length);
      } else if (response.data?.cart_items) {
        setCartCount(response.data.cart_items.length);
      } else if (response.data?.cart) {
        setCartCount(response.data.cart.length);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
