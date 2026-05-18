import { motion } from "framer-motion";
import { palette } from "../../utils/constants";

export default function EmptyState({
  icon = "🛍️",
  title = "Your list is empty",
  description = "Explore our beautiful collections and add your favourites.",
  actionText = "",
  onAction = () => {},
}) {
  return (
    <div
      style={{
        paddingTop: 90,
        minHeight: "65vh",
        background: palette.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 440 }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={{
            fontSize: 72,
            marginBottom: 20,
            userSelect: "none",
            display: "inline-block",
            animation: "petalFloat 3.5s ease-in-out infinite",
          }}
        >
          {icon}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 32,
            fontWeight: 600,
            color: palette.text,
            marginBottom: 10,
            letterSpacing: "-0.2px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: palette.textMuted,
            marginBottom: actionText ? 32 : 0,
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          {description}
        </motion.p>

        {actionText && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAction}
            style={{
              background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
              color: "#fff",
              border: "none",
              borderRadius: 100,
              padding: "14px 36px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 8px 28px rgba(232,160,174,0.4)",
              letterSpacing: 0.2,
            }}
          >
            {actionText}
          </motion.button>
        )}
      </div>
    </div>
  );
}
