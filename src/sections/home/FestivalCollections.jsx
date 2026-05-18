import { useNavigate } from "react-router-dom";
import FestivalBanner from "../../components/FestivalBanner";
import SectionTitle from "../../components/SectionTitle";
import FadeIn from "../../components/FadeIn";
import { FESTIVALS } from "../../data/festivals";
import { palette } from "../../utils/constants";

export default function FestivalCollections() {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "72px 24px", background: palette.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionTitle
            title="Seasonal Collections"
            subtitle="Explore specially crafted arrangements celebrating India's rich festive joy"
            style={{ marginBottom: 48 }}
          />
        </FadeIn>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {FESTIVALS.map((fest, i) => (
            <FadeIn key={fest.id} delay={i * 0.08}>
              <FestivalBanner festival={fest} onClick={handleBannerClick} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
