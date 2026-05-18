import { motion } from "framer-motion";
import { palette } from "../../utils/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function SectionTitle({ title, subtitle, style, accent }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      style={{ textAlign: "center", marginBottom: 44, ...style }}
    >
      {accent && (
        <motion.span
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: palette.blushMid,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            display: "block",
            marginBottom: 12,
          }}
        >
          {accent}
        </motion.span>
      )}

      <motion.h2
        variants={itemVariants}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(26px, 3.5vw, 40px)",
          fontWeight: 600,
          color: palette.text,
          margin: "0 0 10px",
          letterSpacing: "-0.3px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: palette.textMuted,
            margin: "0 auto",
            lineHeight: 1.65,
            maxWidth: 480,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative accent line */}
      <motion.div
        variants={itemVariants}
        style={{
          width: 40,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${palette.blushMid}, transparent)`,
          margin: "18px auto 0",
          borderRadius: 2,
        }}
      />
    </motion.div>
  );
}
