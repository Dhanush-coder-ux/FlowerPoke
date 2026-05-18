import { motion } from "framer-motion";
import { palette } from "../../utils/constants";

export default function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        background: "rgba(255,255,255,0.82)",
        borderRadius: 22,
        padding: "28px 26px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow: "0 4px 28px rgba(45,31,40,0.07)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        cursor: "default",
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 52,
          color: palette.blushMid,
          lineHeight: 0.7,
          marginBottom: 14,
          opacity: 0.6,
          userSelect: "none",
        }}
      >
        "
      </div>

      {/* Stars */}
      <div
        style={{
          display: "flex",
          gap: 2,
          marginBottom: 14,
        }}
      >
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span
            key={i}
            style={{
              color: palette.gold,
              fontSize: 13,
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Text */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 17,
          fontStyle: "italic",
          color: palette.text,
          lineHeight: 1.65,
          margin: "0 0 auto",
          paddingBottom: 20,
          fontWeight: 400,
        }}
      >
        {testimonial.text}
      </p>

      {/* Author */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingTop: 16,
          borderTop: "1px solid rgba(45,31,40,0.07)",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.lavender})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              color: palette.text,
              marginBottom: 2,
            }}
          >
            {testimonial.name}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11.5,
              color: palette.textMuted,
            }}
          >
            {testimonial.city}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
