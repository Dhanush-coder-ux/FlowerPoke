import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { palette } from "../../utils/constants";

const features = [
  {
    icon: "⚡",
    title: "Same-Day Delivery",
    sub: "Order before 4 PM",
    color: "#C8621A",
    bg: "rgba(250,200,160,0.18)",
  },
  {
    icon: "🚀",
    title: "2-Hour Express",
    sub: "Rush orders available",
    color: "#2E6A2C",
    bg: "rgba(180,220,178,0.18)",
  },
  {
    icon: "🌙",
    title: "Midnight Magic",
    sub: "Surprise at 12 AM",
    color: "#6B44C4",
    bg: "rgba(200,190,240,0.18)",
  },
  {
    icon: "🌍",
    title: "Pan-India Delivery",
    sub: "500+ cities covered",
    color: "#B19CD9",
    bg: "rgba(198,178,224,0.18)",
  },
];

export default function DeliveryFeatures() {
  const [ref, visible] = useScrollAnimation();

  return (
    <section
      ref={ref}
      style={{
        background: `linear-gradient(135deg, #1E122C 0%, #2E1B4E 50%, #1A0E2A 100%)`,
        padding: "clamp(22px, 3vw, 36px) clamp(16px, 4vw, 40px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        {features.map(({ icon, title, sub, color, bg }, i) => (
          <div
            key={title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
              cursor: "default",
              animation: visible ? `fadeUp 0.5s ease ${i * 0.1}s both` : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.2)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Icon circle */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: bg,
                border: `1px solid ${color}35`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              {icon}
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: 0.2,
                  marginBottom: 2,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11.5,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: 0.2,
                }}
              >
                {sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
