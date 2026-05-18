import { motion } from "framer-motion";
import SectionTitle from "../../components/SectionTitle";
import FadeIn from "../../components/FadeIn";
import { palette } from "../../utils/constants";

const points = [
  {
    icon: "🌿",
    title: "Farm-Fresh Blooms",
    desc: "Sourced directly from India's finest flower farms — always fresh, always vibrant.",
    color: "#2E6A2C",
    bg: "linear-gradient(135deg, #E8F5E8, #F0FAF0)",
  },
  {
    icon: "🎁",
    title: "Luxury Packaging",
    desc: "Every bouquet wrapped with premium materials and a handwritten note.",
    color: "#7A5820",
    bg: "linear-gradient(135deg, #F5ECD7, #FFF8EC)",
  },
  {
    icon: "⚡",
    title: "Express Delivery",
    desc: "Same-day, 2-hour, and midnight delivery across 500+ Indian cities.",
    color: "#C8621A",
    bg: "linear-gradient(135deg, #FEF3E8, #FFF5E4)",
  },
  {
    icon: "💯",
    title: "Freshness Guarantee",
    desc: "Not satisfied? We replace your bouquet at zero cost, no questions asked.",
    color: "#523675",
    bg: "linear-gradient(135deg, #FAF8FF, #F6F2FC)",
  },
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "80px clamp(16px, 4vw, 40px)", background: palette.cream }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionTitle
            title="Why Floradelic?"
            subtitle="Crafted with care, delivered with love"
            accent="our promise"
          />
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 22,
          }}
        >
          {points.map(({ icon, title, desc, color, bg }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                style={{
                  background: bg,
                  borderRadius: 22,
                  padding: "32px 26px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.7)",
                  boxShadow: "0 2px 16px rgba(45,31,40,0.05)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 16px 40px ${color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 16px rgba(45,31,40,0.05)";
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 18,
                    background: `${color}18`,
                    border: `1px solid ${color}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    marginBottom: 18,
                    userSelect: "none",
                  }}
                >
                  {icon}
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: palette.text,
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13.5,
                    color: palette.textMuted,
                    lineHeight: 1.65,
                    margin: 0,
                    fontWeight: 400,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
