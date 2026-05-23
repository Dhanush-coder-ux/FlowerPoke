import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryCard from "../../components/CategoryCard";
import { CATEGORIES } from "../../data/categories";
import { palette } from "../../utils/constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function CategoriesGrid() {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "120px clamp(16px, 4vw, 40px) 80px", background: palette.offWhite || "#FEFCFA", position: "relative", overflow: "visible" }}>
      {/* ── Seamless Curved Top Divider ── */}
      <div
        style={{
          position: "absolute",
          top: -100, // Pulls the curve up into the hero section
          left: 0,
          width: "100%",
          height: 100,
          overflow: "hidden",
          lineHeight: 0,
          zIndex: 2, // Sits above the hero background
        }}
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
            fill={palette.offWhite || "#FEFCFA"}
          />
        </svg>
      </div>

      {/* ── Watermark flower images (decorative, non-interactive) ── */}
      {[
        { src: "/SVG/WhatsApp_Image_2026-05-19_at_6.21.02_PM-removebg-preview.png",         top: "-60px",  left: "-80px",  size: 320, rotate: -15, opacity: 0.22 },
        { src: "/SVG/WhatsApp_Image_2026-05-19_at_6.21.02_PM__1_-removebg-preview.png",     top: "-40px",  right: "-60px", size: 280, rotate: 12,  opacity: 0.18 },
        { src: "/SVG/WhatsApp_Image_2026-05-19_at_6.21.02_PM__3_-removebg-preview.png",     bottom: "0px", left: "30px",   size: 260, rotate: -8,  opacity: 0.15 },
        { src: "/SVG/WhatsApp_Image_2026-05-19_at_6.21.02_PM__5_-removebg-preview.png",     bottom: "-30px", right: "40px", size: 300, rotate: 18,  opacity: 0.20 },
        { src: "/SVG/WhatsApp_Image_2026-05-19_at_6.21.02_PM__7_-removebg-preview.png",     top: "50%",   left: "50%",    size: 350, rotate: 5,   opacity: 0.12, transform: "translate(-50%, -50%)" },
      ].map((wm, i) => (
        <img
          key={i}
          src={wm.src}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top:    wm.top,
            left:   wm.left,
            right:  wm.right,
            bottom: wm.bottom,
            width:  wm.size,
            height: wm.size,
            objectFit: "contain",
            opacity: wm.opacity,
            transform: wm.transform || `rotate(${wm.rotate}deg)`,
            pointerEvents: "none",
            userSelect: "none",
            mixBlendMode: "multiply",
            zIndex: 0,
            filter: "grayscale(20%)",
          }}
        />
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: palette.blushMid,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            Browse by occasion
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              color: palette.text,
              margin: "0 0 12px",
              letterSpacing: "-0.3px",
              lineHeight: 1.15,
            }}
          >
            Shop by Occasion
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: palette.textMuted,
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 440,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Find the perfect bloom for every cherished moment
          </p>

          {/* Decorative line */}
          <div
            style={{
              width: 48,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${palette.blushMid}, transparent)`,
              margin: "20px auto 0",
              borderRadius: 2,
            }}
          />
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 14,
          }}
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.name} variants={itemVariants}>
              <CategoryCard category={cat} onClick={handleCategoryClick} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ textAlign: "center", marginTop: 40 }}
        >
          <button
            onClick={handleCategoryClick}
            style={{
              background: "transparent",
              color: palette.blushDeep || "#D0788A",
              border: `1.5px solid ${palette.blushMid}`,
              borderRadius: 100,
              padding: "11px 30px",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 0.3,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = palette.blushMid;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,160,174,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = palette.blushDeep || "#D0788A";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View All Occasions →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
