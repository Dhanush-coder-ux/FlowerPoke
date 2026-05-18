import { useState } from "react";
import { motion } from "framer-motion";
import { palette, categoryColors } from "../../utils/constants";

export default function CategoryCard({ category, onClick }) {
  const [hovered, setHovered] = useState(false);
  const colors = categoryColors[category.name] || {
    from: palette.blushLight,
    to: palette.lavenderLight,
    accent: palette.blushMid,
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        background: `linear-gradient(145deg, ${colors.from}, ${colors.to})`,
        borderRadius: 20,
        padding: "26px 14px 22px",
        textAlign: "center",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 16px 40px ${colors.accent}30`
          : "0 2px 12px rgba(45,31,40,0.06)",
        border: `1px solid ${hovered ? colors.accent + "50" : "rgba(255,255,255,0.7)"}`,
        transition: "box-shadow 0.3s ease, border 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `${colors.accent}18`,
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.4)" : "scale(1)",
        }}
      />

      {/* Emoji */}
      <div
        style={{
          fontSize: 34,
          marginBottom: 10,
          userSelect: "none",
          position: "relative",
          zIndex: 1,
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: hovered ? "scale(1.18) rotate(5deg)" : "scale(1) rotate(0deg)",
          display: "inline-block",
        }}
      >
        {category.emoji}
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12.5,
          fontWeight: 600,
          color: hovered ? colors.accent : palette.text,
          letterSpacing: 0.3,
          position: "relative",
          zIndex: 1,
          transition: "color 0.25s ease",
          lineHeight: 1.3,
        }}
      >
        {category.name}
      </div>

      {/* Hover arrow */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 10,
            fontSize: 11,
            color: colors.accent,
            opacity: 0.8,
            animation: "slideInRight 0.2s ease",
            fontWeight: 700,
          }}
        >
          →
        </div>
      )}
    </motion.div>
  );
}
