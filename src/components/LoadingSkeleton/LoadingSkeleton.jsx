import { palette } from "../../utils/constants";

export default function LoadingSkeleton() {
  return (
    <div
      style={{
        paddingTop: 90,
        minHeight: "80vh",
        background: palette.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
      <div
        style={{
          textAlign: "center",
          animation: "pulse 1.5s infinite ease-in-out",
        }}
      >
        <span style={{ fontSize: 44 }}>🌸</span>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 600,
            color: palette.text,
            marginTop: 12,
          }}
        >
          Arranging your blooms...
        </h3>
      </div>
    </div>
  );
}
