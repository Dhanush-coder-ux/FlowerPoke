import { useState } from "react";
import { motion } from "framer-motion";
import { palette } from "../../utils/constants";

export default function FestivalBanner({ festival, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        background: `linear-gradient(135deg, ${palette.blush} 0%, ${palette.lavender} 100%)`,
        borderRadius: 24,
        padding: "clamp(24px, 3vw, 40px) clamp(20px, 3vw, 36px)",
        cursor: "pointer",
        boxShadow: hovered
          ? "0 24px 56px rgba(45,31,40,0.14)"
          : "0 4px 20px rgba(45,31,40,0.06)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        border: "1px solid rgba(255,255,255,0.5)",
        transition: "box-shadow 0.35s ease",
        minHeight: 160,
      }}
    >
      {/* Background shimmer glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Content */}
      <div style={{ zIndex: 2, flex: 1 }}>
        <span
          style={{
            fontSize: 10.5,
            color: "#6B2D42",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            fontFamily: "'DM Sans', sans-serif",
            background: "rgba(255,255,255,0.5)",
            padding: "4px 12px",
            borderRadius: 100,
            display: "inline-block",
            marginBottom: 14,
            backdropFilter: "blur(8px)",
          }}
        >
          {festival.tag}
        </span>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 600,
            color: palette.text,
            margin: "0 0 8px",
            lineHeight: 1.2,
          }}
        >
          {festival.name}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13.5,
            color: palette.text,
            opacity: 0.75,
            maxWidth: 340,
            margin: "0 0 18px",
            lineHeight: 1.55,
          }}
        >
          {festival.desc}
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12.5,
            fontWeight: 600,
            color: palette.blushDeep || "#D0788A",
            fontFamily: "'DM Sans', sans-serif",
            transition: "gap 0.2s ease",
          }}
        >
          Shop Now
          <span
            style={{
              transition: "transform 0.25s ease",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              display: "inline-block",
            }}
          >
            →
          </span>
        </div>
      </div>

      {/* Emoji */}
      <motion.div
        animate={{
          rotate: hovered ? 15 : 0,
          scale: hovered ? 1.18 : 1,
          y: hovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          fontSize: "clamp(60px, 8vw, 90px)",
          userSelect: "none",
          opacity: 0.88,
          flexShrink: 0,
          zIndex: 2,
          filter: "drop-shadow(0 8px 16px rgba(45,31,40,0.12))",
        }}
      >
        {festival.emoji}
      </motion.div>
    </motion.div>
  );
}
