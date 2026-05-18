import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Hero
      onPrimaryClick={handleNavigation}
      onSecondaryClick={handleNavigation}
    />
  );
}
