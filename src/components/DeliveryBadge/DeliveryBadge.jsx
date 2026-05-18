import { badgeColors } from "../../utils/constants";

const labels = {
  "Same-Day": { text: "⚡ Same-Day", emoji: "⚡" },
  "2-Hour": { text: "🚀 2-Hour", emoji: "🚀" },
  "Midnight": { text: "🌙 Midnight", emoji: "🌙" },
};

export default function DeliveryBadge({ type }) {
  const c = badgeColors[type] || { bg: "#f0f0f0", text: "#555", border: "transparent" };
  const label = labels[type]?.text || type;

  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        fontSize: 10.5,
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: 100,
        letterSpacing: 0.4,
        fontFamily: "'DM Sans', sans-serif",
        border: `1px solid ${c.border || "transparent"}`,
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  );
}
