import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import SectionTitle from "../../components/SectionTitle";
import FadeIn from "../../components/FadeIn";
import { PRODUCTS } from "../../data/flowers";
import { palette } from "../../utils/constants";

export default function FeaturedFlowers() {
  const navigate = useNavigate();
  const featured = PRODUCTS.slice(0, 4);

  const handleViewAll = () => {
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "80px clamp(16px, 4vw, 40px)", background: palette.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <SectionTitle
            title="Featured Bouquets"
            subtitle="Our most loved, most gifted arrangements"
            accent="top picks"
            style={{ textAlign: "left", marginBottom: 0 }}
          />
          <button
            onClick={handleViewAll}
            style={{
              background: "transparent",
              color: palette.blushDeep || "#D0788A",
              border: `1.5px solid ${palette.blushMid}`,
              borderRadius: 100,
              padding: "10px 24px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 0.3,
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = palette.blushMid;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = palette.blushDeep || "#D0788A";
            }}
          >
            View All →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {featured.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.07}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
