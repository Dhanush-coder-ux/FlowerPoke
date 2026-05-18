import { useNavigate, useParams } from "react-router-dom";
import { palette } from "../utils/constants";
import FadeIn from "../components/FadeIn";

export default function FestivalCollectionPage() {
  const navigate = useNavigate();
  const { name } = useParams();

  const formattedName = name
    ? name.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Seasonal";

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
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <FadeIn>
          <span style={{ fontSize: 72, userSelect: "none" }}>✨</span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 40,
              fontWeight: 600,
              color: palette.text,
              margin: "16px 0 8px",
            }}
          >
            {formattedName} Collection
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: palette.textMuted,
              maxWidth: 440,
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Specially arranged bouquets reflecting this season's beautiful energy and
            festive joy.
          </p>
          <button
            onClick={() => navigate("/shop")}
            style={{
              background: palette.blushMid,
              color: "#fff",
              border: "none",
              borderRadius: 30,
              padding: "13px 32px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            View Full Collection
          </button>
        </FadeIn>
      </div>
    </div>
  );
}
