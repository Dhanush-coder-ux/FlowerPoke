import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { palette, tagColors } from "../../utils/constants";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { AppContext } from "../../context/AppContext";
import DeliveryBadge from "../DeliveryBadge/DeliveryBadge";
import StarRating from "./StarRating";
import { Heart, Check } from "lucide-react";

export default function ProductCard({
  product,
  onAddToCart: propAddToCart,
  onWishlist: propWishlist,
  wishlist: propWishlistArr,
  onQuickView: propQuickView,
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const context = useContext(AppContext);

  const { onAddToCart } = useCart();
  const { wishlist, onWishlist } = useWishlist();

  const activeWishlist = propWishlistArr || wishlist;
  const isWishlisted = activeWishlist.includes(product.id);
  const handleAddToCart = propAddToCart || onAddToCart;
  const handleWishlist = propWishlist || onWishlist;
  const handleQuickView = propQuickView || context.setQuickView;

  const tc = tagColors[product.tag] || { bg: "#eee", text: "#333" };

  const handleAddClick = (e) => {
    e.stopPropagation();
    handleAddToCart(product);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1200);
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{
        background: palette.white,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 20px 56px rgba(45,31,40,0.13)"
          : "0 2px 16px rgba(45,31,40,0.06)",
        transition: "box-shadow 0.4s ease",
        cursor: "pointer",
        position: "relative",
        border: "1px solid rgba(242,196,206,0.25)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tag badge */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          zIndex: 3,
        }}
      >
        <span
          style={{
            background: tc.bg,
            color: tc.text,
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 100,
            letterSpacing: 0.5,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 2px 8px rgba(45,31,40,0.1)",
          }}
        >
          {product.tag}
        </span>
      </div>

      {/* Wishlist button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          handleWishlist(product.id);
        }}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.15 }}
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          zIndex: 3,
          background: "rgba(255,255,255,0.9)",
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
          boxShadow: "0 2px 12px rgba(45,31,40,0.1)",
          color: isWishlisted ? palette.blushMid : palette.textMuted,
        }}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2} />
      </motion.button>

      {/* Image area */}
      <div
        style={{
          height: 220,
          background: `linear-gradient(145deg, ${palette.blushLight} 0%, ${palette.lavenderLight} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80,
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Subtle glow blob */}
        <div
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.blushMid}25, transparent)`,
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.4)" : "scale(1)",
          }}
        />
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1, rotate: hovered ? 2 : 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          style={{ userSelect: "none", position: "relative", zIndex: 1, width: "100%", height: "100%" }}
        >
          {product.image?.startsWith("http") ? (
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            product.image
          )}
        </motion.div>

        {/* Discount badge */}
        {discount > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              background: "#3A7A38",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 100,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            -{discount}% off
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "16px 18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          flex: 1,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <DeliveryBadge type={product.badge} />
        </div>

        <h3
          style={{
            margin: "4px 0 3px",
            fontSize: 16,
            fontWeight: 600,
            color: palette.text,
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 1.25,
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            margin: "0 0 10px",
            fontSize: 12,
            color: palette.textMuted,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          {product.category}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 14,
          }}
        >
          <StarRating rating={product.rating} />
          <span
            style={{
              fontSize: 11,
              color: palette.textMuted,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ({product.reviews})
          </span>
        </div>

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div>
            <span
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: palette.text,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              ₹{product.price.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 12,
                color: palette.textSoft || palette.textMuted,
                textDecoration: "line-through",
                marginLeft: 7,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.button
              key={addedFlash ? "added" : "add"}
              onClick={handleAddClick}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: addedFlash
                  ? "#3A7A38"
                  : `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
                color: "#fff",
                border: "none",
                borderRadius: 100,
                padding: "8px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.3s ease",
                boxShadow: addedFlash
                  ? "0 4px 16px rgba(58,122,56,0.3)"
                  : "0 4px 16px rgba(232,160,174,0.35)",
                whiteSpace: "nowrap",
                letterSpacing: 0.2,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {addedFlash ? <><Check size={14} strokeWidth={2.5} /> Added!</> : "Add to Cart"}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
