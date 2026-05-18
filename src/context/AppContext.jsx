import { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/flowers";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const onAddToCart = (product, quantity = 1, customOptions = {}) => {
    setCart((c) => {
      const existing = c.find((i) => 
        i.id === product.id &&
        i.deliveryType === customOptions.deliveryType &&
        i.deliveryDate === customOptions.deliveryDate &&
        i.deliverySlot === customOptions.deliverySlot &&
        JSON.stringify(i.personalization) === JSON.stringify(customOptions.personalization)
      );
      if (existing) {
        return c.map((i) =>
          i.id === product.id &&
          i.deliveryType === customOptions.deliveryType &&
          i.deliveryDate === customOptions.deliveryDate &&
          i.deliverySlot === customOptions.deliverySlot &&
          JSON.stringify(i.personalization) === JSON.stringify(customOptions.personalization)
            ? { ...i, quantity: (i.quantity || 0) + quantity }
            : i
        );
      }
      return [...c, { ...product, quantity, ...customOptions }];
    });
    showToast(`${product.name} added to cart 🌸`);
  };

  const onWishlist = (id) => {
    const isCurrentlyWishlisted = wishlist.includes(id);
    setWishlist((w) =>
      w.includes(id) ? w.filter((i) => i !== id) : [...w, id]
    );
    showToast(
      isCurrentlyWishlisted ? `Removed from wishlist` : `Added to wishlist`
    );
  };

  const cartCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        wishlist,
        setWishlist,
        quickView,
        setQuickView,
        toast,
        showToast,
        orderPlaced,
        setOrderPlaced,
        orderDetails,
        setOrderDetails,
        onAddToCart,
        onWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
