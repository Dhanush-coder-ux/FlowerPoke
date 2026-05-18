import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useWishlist() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useWishlist must be used within an AppProvider");
  }
  return {
    wishlist: context.wishlist,
    setWishlist: context.setWishlist,
    onWishlist: context.onWishlist,
  };
}
