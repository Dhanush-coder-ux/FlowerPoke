import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { palette } from "../utils/constants";
import FadeIn from "../components/FadeIn";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingTop: 90,
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${palette.blushLight} 0%, ${palette.cream} 60%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", padding: "0 clamp(16px, 4vw, 24px)" }}>
        <FadeIn>
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            style={{
              fontSize: 88,
              userSelect: "none",
              display: "inline-block",
              animation: "petalFloat 4s ease-in-out infinite",
              filter: "grayscale(0.3)",
            }}
          >
            🥀
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: palette.blushMid,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                display: "block",
                marginTop: 24,
                marginBottom: 12,
              }}
            >
              Error 404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 600,
              color: palette.text,
              margin: "0 0 14px",
              letterSpacing: "-0.5px",
              lineHeight: 1.1,
            }}
          >
            Page Wilted
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: palette.textMuted,
              maxWidth: 460,
              margin: "0 auto 36px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            The link you followed might be broken, or the page may have been
            removed. Let's get you back to the garden.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
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
                boxShadow: "0 8px 24px rgba(232,160,174,0.4)",
                letterSpacing: 0.2,
              }}
            >
              Back to Garden
            </motion.button>
            <motion.button
              onClick={() => navigate("/shop")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "rgba(255,255,255,0.7)",
                color: palette.text,
                border: `1.5px solid rgba(232,160,174,0.4)`,
                borderRadius: 100,
                padding: "13px 32px",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                backdropFilter: "blur(8px)",
                letterSpacing: 0.1,
              }}
            >
              Browse Flowers
            </motion.button>
          </motion.div>
        </FadeIn>
      </div>
    </div>
  );
}
