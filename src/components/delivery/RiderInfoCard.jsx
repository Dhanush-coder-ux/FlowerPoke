import { palette } from "../../utils/constants";
import { motion } from "framer-motion";

export default function RiderInfoCard({ riderName = "Vikram Singh", vehicle = "MH 12 AB 3456", rating = 4.8 }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 16,
        border: "1px solid rgba(45,31,40,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${palette.sageLight}, #B2C8B0)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          🛵
        </div>
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: palette.text,
              marginBottom: 2,
            }}
          >
            {riderName}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: palette.textMuted,
            }}
          >
            {vehicle} • <span style={{ color: palette.gold }}>★ {rating}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: palette.cream,
            border: "1px solid rgba(45,31,40,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          💬
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "#2E6A2C",
            color: "#fff",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          📞
        </motion.button>
      </div>
    </div>
  );
}
