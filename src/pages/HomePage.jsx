import HeroSection from "../sections/home/HeroSection";
import DeliveryFeatures from "../sections/home/DeliveryFeatures";
import FeaturedFlowers from "../sections/home/FeaturedFlowers";
import TrendingFlowers from "../sections/home/TrendingFlowers";
import ComboOffers from "../sections/home/ComboOffers";
import FestivalCollections from "../sections/home/FestivalCollections";
import Testimonials from "../sections/home/Testimonials";
import WhyChooseUs from "../sections/home/WhyChooseUs";
import NewsletterSection from "../sections/home/NewsletterSection";
import CategoriesGrid from "../sections/home/CategoriesGrid";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <DeliveryFeatures />
      <CategoriesGrid />
      <FeaturedFlowers />
      <Testimonials />
      <ComboOffers />
      <TrendingFlowers />
      <FestivalCollections />
      <WhyChooseUs />
      <NewsletterSection />
    </div>
  );
}
