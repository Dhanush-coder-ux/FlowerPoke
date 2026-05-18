import ComboOfferCard from "../../components/ComboOfferCard";
import SectionTitle from "../../components/SectionTitle";
import FadeIn from "../../components/FadeIn";
import { COMBO_OFFERS } from "../../data/comboOffers";
import { palette } from "../../utils/constants";

export default function ComboOffers() {
  return (
    <section
      style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: palette.champagne || "#F5ECD7",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionTitle
            title="Special Combo Offers"
            subtitle="Perfect bundles curated to spread double the joy"
            accent="bundle & save"
          />
        </FadeIn>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 22,
          }}
        >
          {COMBO_OFFERS.map((combo, i) => (
            <FadeIn key={combo.id} delay={i * 0.1}>
              <ComboOfferCard combo={combo} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
