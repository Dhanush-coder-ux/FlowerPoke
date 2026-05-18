export const animations = {
  springGentle: {
    type: "spring",
    stiffness: 260,
    damping: 22
  },
  springSmooth: {
    type: "spring",
    stiffness: 180,
    damping: 20
  },
  fadeInUp: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  },
  hoverLift: {
    whileHover: { y: -6, scale: 1.01 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
