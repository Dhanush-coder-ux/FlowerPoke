import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../hooks/useWishlist";
import { PRODUCTS } from "../data/flowers";
import { palette } from "../utils/constants";
import EmptyState from "../components/EmptyState";
import ProductCard from "../components/ProductCard";
import FadeIn from "../components/FadeIn";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <EmptyState
        icon="🤍"
        title="Your wishlist is empty"
        description="Heart your favourite blooms to save them here for later"
        actionText="Browse Flowers"
        onAction={() => navigate("/shop")}
      />
    );
  }

  return (
    <div style={{ paddingTop: 90, minHeight: "100vh", background: palette.cream }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px clamp(16px, 4vw, 32px)" }}>
        <FadeIn>
          <div style={{ marginBottom: 36 }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: palette.blushMid,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              Saved for later
            </span>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 600,
                color: palette.text,
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              My Wishlist
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: palette.blushLight,
                  color: palette.blushDeep || "#D0788A",
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 100,
                  padding: "3px 14px",
                  marginLeft: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  verticalAlign: "middle",
                }}
              >
                {wishlist.length}
              </span>
            </h1>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
            gap: 24,
          }}
        >
          {wishlistedProducts.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.05}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
