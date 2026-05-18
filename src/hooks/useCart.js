import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useCart() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useCart must be used within an AppProvider");
  }
  return {
    cart: context.cart,
    setCart: context.setCart,
    cartCount: context.cartCount,
    onAddToCart: context.onAddToCart,
  };
}
