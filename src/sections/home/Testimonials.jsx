import TestimonialCard from "../../components/TestimonialCard";
import SectionTitle from "../../components/SectionTitle";
import { TESTIMONIALS } from "../../data/testimonials";
import { palette } from "../../utils/constants";

export default function Testimonials() {
  return (
    <section
      style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: `linear-gradient(135deg, ${palette.lavenderLight} 0%, ${palette.blushLight} 60%, ${palette.champagne || "#F5ECD7"} 100%)`,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle
          title="Stories of Joy"
          subtitle="Real moments made magical with Floradelic"
          accent="testimonials"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 22,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={{
                animation: `fadeUp 0.6s ease ${i * 0.12}s both`,
              }}
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
