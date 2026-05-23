import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
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
  const heroSectionRef = useRef(null);
  const carouselRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scroll-driven parallax — canvas fades out slightly on scroll
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const canvasScale  = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Typography parallax — scrolls slightly faster than bouquet (depth illusion)
  const typoY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  // Mouse parallax for the HTML UI content layer (subtle)
  const mouseRef = useRef({ x: 0, y: 0 });
  const uiX = useSpring(0, { stiffness: 60, damping: 20 });
  const uiY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouse = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      uiX.set(((e.clientX - cx) / cx) * 6);
      uiY.set(((e.clientY - cy) / cy) * 4);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [uiX, uiY]);

  const [activeImg, setActiveImg] = useState(0);

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

      {/* ═══════════════════════════════════════════════════════
          FULLSCREEN HERO SECTION — CINEMATIC LAYERED COMPOSITION
          Layer stack (bottom → top):
            1. Background gradient        (z: 0)
            2. CSS floating petals layer  (z: 5)
            3. 3D bouquet canvas          (z: 20)  ← interactive
            4. Giant ETERNAL BLOOMS type  (z: 30)  ← blend on top
            5. UI / CTA content           (z: 40)
         ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroSectionRef}
        style={{
          height: "100vh",
          width: "100%",
          position: "sticky",
          top: 0,
          overflow: "hidden",
          /* Layer 1 — background gradient */
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(220,200,255,0.55) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 20% 100%, rgba(255,215,230,0.4)  0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 80%,  rgba(180,150,240,0.35) 0%, transparent 65%),
            linear-gradient(135deg, #FAF6F0 0%, #FAF8FF 45%, #E1D5F0 100%)
          `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        {/* ── Layer 2: CSS Floating Petal Particles (HTML layer, z:5) ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: `${8 + (i % 5) * 6}px`,
                height: `${8 + (i % 5) * 6}px`,
                left: `${(i * 5.5 + 3) % 100}%`,
                top: `${(i * 7 + 10) % 110}%`,
                borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%",
                background: [
                  "rgba(200,170,240,0.25)",
                  "rgba(242,196,206,0.3)",
                  "rgba(177,140,220,0.2)",
                  "rgba(255,182,193,0.25)",
                  "rgba(200,200,255,0.2)",
                ][i % 5],
                filter: `blur(${i % 3}px)`,
              }}
              animate={{
                y: [0, -30, 0, 20, 0],
                x: [0, 15, -10, 8, 0],
                rotate: [0, 120, 240, 360],
                scale: [1, 1.15, 0.9, 1.05, 1],
              }}
              transition={{
                duration: 8 + (i % 4) * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        {/* ── Layer 3: 3D Bouquet Canvas (z:20) — INTERACTIVE ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            opacity: canvasOpacity,
            scale: canvasScale,
            // Allow mouse events so the 3D scene gets them
            pointerEvents: "auto",
          }}
        >
          <HeroCanvas />
        </motion.div>

        {/* ── Layer 4: Giant "ETERNAL BLOOMS" Typography (z:30) ── */}
        {/* CRITICAL: sits ABOVE the bouquet, blends through it cinematically */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            position: "absolute",
            zIndex: 30,
            pointerEvents: "none",
            userSelect: "none",
            textAlign: "center",
            width: "100%",
            y: typoY,
            /* Depth blur: slightly soft so it reads as distance */
            filter: "blur(0px)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(80px, 18vw, 260px)",
              fontWeight: 700,
              lineHeight: 0.83,
              margin: 0,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
            }}
          >
            {/* "ETERNAL" — elegant, solid, subtle static depth */}
            <span
              style={{
                display: "block",
                color: "#7B3FA0",
                opacity: 1,
                mixBlendMode: "normal",
                WebkitTextStroke: "0px",
                textShadow: "0px 8px 24px rgba(123, 63, 160, 0.25)",
              }}
            >
              Eternal
            </span>

            {/* "BLOOMS" — Singular, intense, attractive neon flow in one color */}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px rgba(177, 156, 217, 0.4), 0 0 20px rgba(177, 156, 217, 0.3), 0 0 30px rgba(177, 156, 217, 0.2)",
                  "0 0 15px rgba(177, 156, 217, 0.9), 0 0 30px rgba(177, 156, 217, 0.7), 0 0 50px rgba(177, 156, 217, 0.5), 0 0 70px rgba(177, 156, 217, 0.3)",
                  "0 0 10px rgba(177, 156, 217, 0.4), 0 0 20px rgba(177, 156, 217, 0.3), 0 0 30px rgba(177, 156, 217, 0.2)",
                ]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "block",
                color: "#FFFFFF",
                opacity: 1,
                mixBlendMode: "normal",
                position: "relative",
                zIndex: 35,
              }}
            >
              Blooms
            </motion.span>
          </h1>

          {/* Sub-tagline — fully readable, sits atop everything */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(12px, 1.6vw, 20px)",
              color: "rgba(100,70,140,0.75)",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              marginTop: 24,
              fontWeight: 500,
              mixBlendMode: "normal",
              opacity: 1,
            }}
          >
            The Floradelic Experience
          </p>
        </motion.div>

        {/* ── Layer 5: UI / CTA Content (z:40) ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 40,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "clamp(32px, 6vh, 64px)",
            x: uiX,
            y: uiY,
          }}
        >
          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              marginBottom: 48,
              pointerEvents: "auto",
            }}
          >
            <button
              style={{
                background: "rgba(130, 90, 180, 0.88)",
                color: "#fff",
                border: "none",
                padding: "14px 36px",
                borderRadius: 100,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(120,80,180,0.35), 0 2px 8px rgba(0,0,0,0.12)",
                transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(110, 65, 165, 0.95)";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(120,80,180,0.5), 0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(130, 90, 180, 0.88)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(120,80,180,0.35), 0 2px 8px rgba(0,0,0,0.12)";
              }}
            >
              Shop Collection
            </button>

            <button
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "rgba(80,50,120,0.9)",
                border: "1px solid rgba(180,150,220,0.45)",
                padding: "13px 32px",
                borderRadius: 100,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                backdropFilter: "blur(16px)",
                transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.32)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(180,150,220,0.75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(180,150,220,0.45)";
              }}
            >
              Explore
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              pointerEvents: "none",
            }}
          >
            <span style={{
              fontSize: 10,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(100,70,140,0.6)",
              fontWeight: 600,
            }}>
              Scroll to Explore
            </span>
            <div style={{
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom, rgba(130,90,180,0.6), transparent)"
            }} />
          </motion.div>
        </motion.div>

        {/* ── Vignette edge glow (decorative, z:15) ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 15,
            pointerEvents: "none",
            background: `
              radial-gradient(ellipse 70% 50% at 50% 50%, transparent 50%, rgba(200,170,240,0.12) 100%),
              radial-gradient(ellipse 100% 100% at 50% 110%, rgba(140,100,200,0.2) 0%, transparent 60%)
            `,
          }}
        />
      </section>


      {/* ═══════════════════════════════════════════════════════
          SCROLL-REVEALED IMAGE CAROUSEL SECTION
         ═══════════════════════════════════════════════════════ */}
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
                  borderRadius: 24,
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

          <style dangerouslySetInnerHTML={{
            __html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`
          }} />
        </motion.div>
      </section>

    </div>
  );
}
