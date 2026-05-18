import { motion } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { palette } from "../../utils/constants";

export default function CartButton({
  product,
  floating = false,
  quantity = 1,
  onClick,
  style,
}) {
  const { cartCount, onAddToCart } = useCart();

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
      return;
    }
    if (product) {
      onAddToCart(product, quantity);
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
          background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
          border: "none",
          boxShadow: "0 6px 24px rgba(232,160,174,0.45)",
          cursor: "pointer",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          ...style,
        }}
      >
        🛍️
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: palette.text,
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
              boxShadow: "0 2px 8px rgba(45,31,40,0.3)",
            }}
          >
            {cartCount}
          </motion.span>
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.94 }}
      style={{
        background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
        color: palette.white,
        border: "none",
        borderRadius: 100,
        padding: "9px 18px",
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 14px rgba(232,160,174,0.35)",
        letterSpacing: 0.2,
        ...style,
      }}
    >
      Add to Cart
    </motion.button>
  );
}
