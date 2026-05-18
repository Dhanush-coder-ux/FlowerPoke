import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
