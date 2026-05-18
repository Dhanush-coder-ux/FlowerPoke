import { useNavigate } from "react-router-dom";
import { palette } from "../utils/constants";
import FadeIn from "../components/FadeIn";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingTop: 90,
        minHeight: "100vh",
        background: palette.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: "100%",
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        <FadeIn>
          <div
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 40,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(61,43,53,0.06)",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: palette.blushLight,
                color: palette.blushMid,
                fontSize: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontWeight: 700,
                userSelect: "none",
              }}
            >
              DK
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26,
                fontWeight: 600,
                color: palette.text,
                margin: "0 0 6px",
              }}
            >
              Dhanush Kumar
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: palette.textMuted,
                marginBottom: 28,
              }}
            >
              dhanush@example.com
            </p>
            <div
              style={{
                borderTop: "1px solid rgba(61,43,53,0.08)",
                paddingTop: 20,
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: palette.text,
                  marginBottom: 12,
                }}
              >
                Recent Activities
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: palette.textMuted,
                  margin: 0,
                }}
              >
                No active orders or shipping histories yet.
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: 32,
                width: "100%",
                background: palette.blushMid,
                color: "#fff",
                border: "none",
                borderRadius: 30,
                padding: "12px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Return to Garden
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
