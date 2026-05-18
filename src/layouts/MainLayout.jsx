import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WishlistButton from "../components/WishlistButton";
import CartButton from "../components/CartButton";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like smooth expo easeOut
      smoothWheel: true,
      wheelMultiplier: 1.05,
    })

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Scroll Restoration: Scroll to top instantly on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Original UI logic: {page !== "success" && <Footer setPage={navigate} />}
  const isSuccessPage = location.pathname.includes("/success");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      {!isSuccessPage && <Footer />}

      {/* Floating Widgets */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 150,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <WishlistButton floating onClick={() => navigate("/wishlist")} />
        <CartButton floating onClick={() => navigate("/cart")} />
      </div>
    </div>
  );
}
