import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroCanvas from "../3d/HeroCanvas";
import { palette } from "../../utils/constants";

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1548094891-c4ba474efd16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Eternal Pastels",
    desc: "Soft pinks, creams, and whites for delicate and elegant occasions."
  },
  {
    url: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Royal Crimson",
    desc: "Rich red roses and deep dark foliage for passionate and classic statements."
  },
  {
    url: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Orchid Whispers",
    desc: "Exotic orchids, elegant lilies, and custom luxury styling for refined tastes."
  },
  {
    url: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Sunshine Meadows",
    desc: "Vibrant yellow sunflowers, wildflowers, and daisies to brighten any modern space."
  },
  {
    url: "https://images.unsplash.com/photo-1490750967868-88cb44cb2753?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Lavender Dreams",
    desc: "Calming lavender blooms, fresh foliage, and wild herbs for ultimate peace."
  }
];


export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax fade for the 3D canvas when scrolling down
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const [activeImg, setActiveImg] = useState(0);

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -window.innerWidth * 0.4, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: window.innerWidth * 0.4, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} style={{ background: palette.cream }}>

      {/* 1. Fullscreen 3D Hero Section */}
      <section
        style={{
          height: "100vh",
          width: "100%",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          background: `linear-gradient(135deg, #FAF6F0 0%, #FAF8FF 45%, #E1D5F0 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Massive Background Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            userSelect: "none",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(80px, 18vw, 250px)",
              fontWeight: 700,
              lineHeight: 0.85,
              margin: 0,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "rgba(165, 142, 186, 0.85)", display: "block" }}>
              Eternal
            </span>
            <span style={{ color: "rgba(165, 142, 186, 0.2)", display: "block" }}>
              Blooms
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px, 2vw, 22px)",
              color: palette.textMuted,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              marginTop: 20,
              fontWeight: 500,
            }}
          >
            The Floradelic Experience
          </p>
        </motion.div>

        <motion.div style={{ opacity, scale, width: "100%", height: "100%", position: "relative", zIndex: 10 }}>
          <HeroCanvas />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <span style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: 2, textTransform: "uppercase", color: palette.textMuted }}>
            Scroll to Explore
          </span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${palette.textMuted}, transparent)` }} />
        </motion.div>
      </section>

      {/* 2. Scroll-Revealed Image Carousel */}
      <section
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "transparent",
          position: "relative",
          zIndex: 10,
          padding: "120px clamp(20px, 5vw, 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ width: "100%", maxWidth: 1400, position: "relative" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: palette.text,
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.5px"
              }}
            >
              Our Premium Collections
            </h2>

            {/* Navigation Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={scrollLeft}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid rgba(45,31,40,0.15)",
                  background: "transparent",
                  color: palette.text,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = palette.text;
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = palette.text;
                }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={scrollRight}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid rgba(45,31,40,0.15)",
                  background: "transparent",
                  color: palette.text,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = palette.text;
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = palette.text;
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            style={{
              display: "flex",
              gap: 32,
              overflowX: "auto",
              paddingBottom: 40,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
            }}
            className="hide-scrollbar"
          >
            {carouselImages.map((img, i) => (
              <motion.div
                key={i}
                style={{
                  minWidth: "clamp(320px, 50vw, 600px)",
                  height: "clamp(200px, 31.25vw, 375px)",
                  flexShrink: 0,
                  scrollSnapAlign: "center",
                  borderRadius: 24, // GORGEOUS ROUNDED CORNERS
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: activeImg === i ? "0 20px 50px rgba(45,31,40,0.2)" : "0 4px 20px rgba(45,31,40,0.05)",
                  transition: "box-shadow 0.5s ease, transform 0.5s ease",
                  transform: activeImg === i ? "scale(1)" : "scale(0.96)",
                  cursor: "pointer",
                  border: "1px solid rgba(242,196,206,0.2)",
                }}
                onClick={() => setActiveImg(i)}
                onViewportEnter={() => setActiveImg(i)}
                viewport={{ amount: 0.8 }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                />

                {/* Premium Text Overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, rgba(45,31,40,0.85) 0%, rgba(45,31,40,0.3) 60%, transparent 100%)",
                    padding: "28px 24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "60%",
                    transition: "opacity 0.4s ease",
                    opacity: activeImg === i ? 1 : 0.4,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "clamp(18px, 2.2vw, 26px)",
                      color: "#fff",
                      margin: "0 0 6px",
                      fontWeight: 600,
                      letterSpacing: "0.2px",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    {img.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(12px, 1.3vw, 14px)",
                      color: "rgba(255,255,255,0.85)",
                      margin: 0,
                      lineHeight: 1.45,
                      fontWeight: 400,
                      maxWidth: "92%",
                      opacity: activeImg === i ? 1 : 0,
                      transform: activeImg === i ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 0.4s ease, transform 0.4s ease",
                    }}
                  >
                    {img.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom style to hide webkit scrollbar for the carousel */}
          <style dangerouslySetInnerHTML={{
            __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />
        </motion.div>
      </section>

    </div>
  );
}
