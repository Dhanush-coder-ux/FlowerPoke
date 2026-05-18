import { palette } from "../../utils/constants";

export function PrimaryButton({ children, onClick, style, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
        color: "#fff",
        border: "none",
        borderRadius: 100,
        padding: "13px 28px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 6px 22px rgba(232, 160, 174, 0.4)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        letterSpacing: 0.2,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(232, 160, 174, 0.52)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 22px rgba(232, 160, 174, 0.4)";
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, style, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.7)",
        color: palette.text,
        border: `1.5px solid rgba(232, 160, 174, 0.4)`,
        borderRadius: 100,
        padding: "12px 28px",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        backdropFilter: "blur(8px)",
        transition: "all 0.25s ease",
        letterSpacing: 0.1,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.95)";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,31,40,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.7)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      {...props}
    >
      {children}
    </button>
  );
}
