import { motion } from "framer-motion";
import { palette } from "../../utils/constants";

export default function DeliveryMapPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: 180,
        borderRadius: 20,
        background: `linear-gradient(135deg, ${palette.sageLight} 0%, #E3EFE1 100%)`,
        border: "1px solid rgba(46, 106, 44, 0.2)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      {/* Fake map grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          opacity: 0.5,
        }}
      />
      
      {/* Route line */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 20 80 Q 40 40 80 20"
          fill="none"
          stroke="#2E6A2C"
          strokeWidth="3"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "linear" }}
        />
      </svg>

      {/* Markers */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        style={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          fontSize: 24,
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
        }}
      >
        🏪
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
        style={{
          position: "absolute",
          top: "12%",
          right: "12%",
          fontSize: 24,
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
        }}
      >
        📍
      </motion.div>
      
      {/* Rider */}
      <motion.div
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          offsetPath: "path('M 20 80 Q 40 40 80 20')",
          fontSize: 28,
          zIndex: 2,
        }}
      >
        🛵
      </motion.div>

      {/* Glass overlay text */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(4px)",
          padding: "4px 10px",
          borderRadius: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: "#2E6A2C",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        Live Tracking
      </div>
    </div>
  );
}
