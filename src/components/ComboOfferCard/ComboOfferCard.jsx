import { useState } from "react";
import { motion } from "framer-motion";
import { palette } from "../../utils/constants";
import { useCart } from "../../hooks/useCart";
import { Check } from "lucide-react";

export default function ComboOfferCard({ combo }) {
  const [hovered, setHovered] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const { onAddToCart } = useCart();

  const savings = combo.originalPrice - combo.price;
  const savePct = Math.round((savings / combo.originalPrice) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(combo);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1200);
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{
        background: palette.white,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 20px 56px rgba(45,31,40,0.13)"
          : "0 2px 16px rgba(45,31,40,0.06)",
        border: "1px solid rgba(242,196,206,0.28)",
        transition: "box-shadow 0.35s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Save badge */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: "linear-gradient(135deg, #3A7A38, #2E6A2C)",
          color: "#fff",
          fontSize: 10.5,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 100,
          zIndex: 3,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 12px rgba(58,122,56,0.3)",
        }}
      >
        Save {savePct}%
      </div>

      {/* Image area */}
      <div
        style={{
          fontSize: 56,
          background: `linear-gradient(145deg, ${palette.blushLight}, ${palette.lavenderLight})`,
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.blushMid}20, transparent)`,
            transform: hovered ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
        >
          {combo.image}
        </motion.div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "18px 20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 600,
            color: palette.text,
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          {combo.name}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: palette.textMuted,
            lineHeight: 1.55,
            margin: 0,
            flex: 1,
          }}
        >
          {combo.desc}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
            paddingTop: 14,
            borderTop: "1px solid rgba(45,31,40,0.07)",
          }}
        >
          <div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: palette.text,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              ₹{combo.price.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 12.5,
                color: palette.textMuted,
                textDecoration: "line-through",
                marginLeft: 7,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              ₹{combo.originalPrice.toLocaleString()}
            </span>
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            style={{
              background: addedFlash
                ? "#3A7A38"
                : `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
              color: "#fff",
              border: "none",
              borderRadius: 100,
              padding: "9px 18px",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: addedFlash
                ? "0 4px 14px rgba(58,122,56,0.3)"
                : "0 4px 14px rgba(232,160,174,0.35)",
              transition: "background 0.3s ease",
              letterSpacing: 0.2,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {addedFlash ? <><Check size={14} strokeWidth={2.5} /> Added!</> : "Get Combo"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
