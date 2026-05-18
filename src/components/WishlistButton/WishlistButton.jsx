import { motion } from "framer-motion";
import { useWishlist } from "../../hooks/useWishlist";
import { palette } from "../../utils/constants";

export default function WishlistButton({
  productId,
  floating = false,
  onClick,
}) {
  const { wishlist, onWishlist } = useWishlist();
  const isWishlisted = productId ? wishlist.includes(productId) : false;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
      return;
    }
    if (productId) {
      onWishlist(productId);
    }
  };

  if (floating) {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.88 }}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid rgba(242, 196, 206, 0.5)",
          boxShadow: "0 6px 24px rgba(45,31,40,0.13)",
          cursor: "pointer",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        ❤️
        {wishlist.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
              color: "#fff",
              borderRadius: "50%",
              width: 20,
              height: 20,
              fontSize: 10,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 2px 8px rgba(232,160,174,0.5)",
            }}
          >
            {wishlist.length}
          </motion.span>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      style={{
        background: "rgba(255,255,255,0.88)",
        border: "1px solid rgba(242,196,206,0.4)",
        borderRadius: "50%",
        width: 36,
        height: 36,
        cursor: "pointer",
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 10px rgba(45,31,40,0.1)",
      }}
    >
      {isWishlisted ? "❤️" : "🤍"}
    </motion.button>
  );
}
