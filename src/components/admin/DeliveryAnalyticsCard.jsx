import { palette } from "../../utils/constants";
import { motion } from "framer-motion";

export default function DeliveryAnalyticsCard({ title, value, trend, icon, color = palette.blushMid }) {
  const isPositive = trend && trend.startsWith("+");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 4px 20px rgba(45,31,40,0.05)",
        border: "1px solid rgba(45,31,40,0.06)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}15, transparent)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13.5,
            fontWeight: 600,
            color: palette.textMuted,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `${color}1A`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 38,
            fontWeight: 700,
            color: palette.text,
            lineHeight: 1,
            letterSpacing: "-0.5px",
          }}
        >
          {value}
        </div>
        {trend && (
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: isPositive ? "#2E6A2C" : "#A0404F",
              background: isPositive ? "#E3EFE1" : "#FCE8D5",
              padding: "4px 8px",
              borderRadius: 6,
              marginBottom: 4,
            }}
          >
            {trend}
          </div>
        )}
      </div>
    </motion.div>
  );
}
