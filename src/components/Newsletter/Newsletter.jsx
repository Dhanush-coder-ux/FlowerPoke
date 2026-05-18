import { useState } from "react";
import { motion } from "framer-motion";
import { palette } from "../../utils/constants";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      {/* Icon */}
      <div
        style={{
          fontSize: 44,
          marginBottom: 20,
          userSelect: "none",
          animation: "petalFloat 3.5s ease-in-out infinite",
          display: "inline-block",
        }}
      >
        🌸
      </div>

      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 600,
          color: "#fff",
          marginBottom: 14,
          lineHeight: 1.15,
          letterSpacing: "-0.3px",
        }}
      >
        Stay in Bloom
      </h2>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          color: "rgba(255,255,255,0.65)",
          marginBottom: 36,
          lineHeight: 1.7,
          maxWidth: 420,
          margin: "0 auto 36px",
        }}
      >
        Get seasonal collections, exclusive discounts, and floral inspiration
        delivered to your inbox — every fortnight.
      </p>

      {!submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            gap: 10,
            maxWidth: 440,
            margin: "0 auto",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              type="email"
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 100,
                border: "1.5px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.5)";
                e.target.style.boxShadow = "0 0 0 4px rgba(255,255,255,0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            onClick={handleSubscribe}
            style={{
              background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
              color: "#fff",
              border: "none",
              borderRadius: 100,
              padding: "14px 28px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
              boxShadow: "0 6px 24px rgba(232,160,174,0.45)",
              transition: "all 0.25s ease",
              letterSpacing: 0.2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 32px rgba(232,160,174,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(232,160,174,0.45)";
            }}
          >
            Subscribe
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 100,
            padding: "14px 28px",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <span style={{ fontSize: 20 }}>🌷</span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 19,
              fontStyle: "italic",
              color: "#fff",
            }}
          >
            Thank you for joining our garden
          </span>
        </motion.div>
      )}

      {/* Trust note */}
      {!submitted && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11.5,
            color: "rgba(255,255,255,0.38)",
            marginTop: 16,
            letterSpacing: 0.3,
          }}
        >
          No spam, ever. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
