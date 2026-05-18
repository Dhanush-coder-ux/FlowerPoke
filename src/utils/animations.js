export const fadeInTransition = (delay = 0) => ({
  opacity: 1,
  transform: "translateY(0)",
  transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
});

export const hiddenTransitionStyle = {
  opacity: 0,
  transform: "translateY(28px)",
};

export const hoverScaleStyle = {
  transform: "scale(1.05)",
  transition: "transform 0.2s ease-in-out",
};
