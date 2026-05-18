import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { palette } from "../utils/constants";

export default function FlowerCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect desktop screen with pointing device
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add a flower particle trail occasionally
      if (Math.random() < 0.25) {
        setParticles((prev) => [
          ...prev.slice(-15), // Limit length of active trail
          {
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            scale: Math.random() * 0.4 + 0.3,
            rotation: Math.random() * 360,
            emoji: ["🌸", "🌹", "🌷", "💮", "🌺"][Math.floor(Math.random() * 5)],
          },
        ]);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.style.cursor === "pointer" ||
        target.closest("[onClick]");
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // CSS rule to hide default cursor dynamically on desktop
    const style = document.createElement("style");
    style.id = "flower-cursor-hide-default";
    style.innerHTML = `
      @media (pointer: fine) {
        html, body, button, a, select, input, textarea, div, span, img {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      const styleEl = document.getElementById("flower-cursor-hide-default");
      if (styleEl) styleEl.remove();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Falling Flower Petals Trail */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0.9,
              scale: p.scale,
              x: p.x - 10,
              y: p.y - 10,
              rotate: p.rotation,
            }}
            animate={{
              opacity: 0,
              scale: 0.1,
              y: p.y + 50 + Math.random() * 30, // Drift down
              x: p.x - 10 + (Math.random() * 30 - 15), // Sway side to side
              rotate: p.rotation + 120,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              pointerEvents: "none",
              zIndex: 9998,
              fontSize: 16,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Luxury Outer Spring Ring */}
      <motion.div
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovered ? 1.55 : 1,
          borderColor: isHovered ? palette.blushMid : "rgba(232, 160, 174, 0.45)",
          backgroundColor: isHovered ? `${palette.blushLight}25` : "transparent",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 26 }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(232, 160, 174, 0.45)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Luxury Inner Floral Cursor Node */}
      <motion.div
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovered ? 1.25 : 1,
          rotate: position.x + position.y,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 12,
          height: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10000,
          fontSize: 10.5,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        🌸
      </motion.div>
    </>
  );
}
