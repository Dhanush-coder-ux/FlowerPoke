import Newsletter from "../../components/Newsletter";
import FadeIn from "../../components/FadeIn";

export default function NewsletterSection() {
  return (
    <section
      style={{
        padding: "80px clamp(16px, 4vw, 40px)",
        background: `linear-gradient(135deg, #2D1F28 0%, #4A2B3A 40%, #3A2540 70%, #2D3A50 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background circles */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,160,174,0.1), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(216,201,232,0.1), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <FadeIn>
        <Newsletter />
      </FadeIn>
    </section>
  );
}
