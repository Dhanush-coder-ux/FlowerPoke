import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { palette } from "../../utils/constants";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

const navLinks = [
    { key: "home", label: "Home", path: "/" },
    { key: "shop", label: "Shop", path: "/shop" },
    { key: "sameday", label: "Same Day Delivery", path: "/shop?filter=sameday" },
    { key: "wishlist", label: "Wishlist", path: "/wishlist" },
    { key: "cart", label: "Cart", path: "/cart" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { wishlist } = useWishlist();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const getActivePage = () => {
        const path = location.pathname;
        if (path === "/") return "home";
        if (path.startsWith("/shop")) {
            if (location.search.includes("filter=sameday")) return "sameday";
            return "shop";
        }
        if (path.startsWith("/wishlist")) return "wishlist";
        if (path.startsWith("/cart")) return "cart";
        if (path.startsWith("/checkout")) return "checkout";
        return "";
    };

    const activePage = getActivePage();

    const handleNavClick = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isHome = location.pathname === "/";

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 200,
                    background: scrolled
                        ? "rgba(253, 246, 238, 0.88)"
                        : isHome
                            ? "transparent"
                            : "rgba(253, 246, 238, 0.88)",
                    backdropFilter: scrolled || !isHome ? "blur(20px) saturate(1.8)" : "none",
                    WebkitBackdropFilter: scrolled || !isHome ? "blur(20px) saturate(1.8)" : "none",
                    borderBottom: scrolled || !isHome
                        ? "1px solid rgba(232, 160, 174, 0.2)"
                        : "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    padding: "0 clamp(16px, 4vw, 40px)",
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: scrolled ? 62 : 72,
                        transition: "height 0.4s ease",
                    }}
                >
                    {/* Logo */}
                    <div
                        onClick={() => handleNavClick("/")}
                        style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                            userSelect: "none",
                        }}
                    >
                        <div
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #F2C4CE, #D8C9E8)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                                boxShadow: "0 4px 12px rgba(232, 160, 174, 0.35)",
                                flexShrink: 0,
                            }}
                        >
                            🌸
                        </div>
                        <span
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 22,
                                fontWeight: 600,
                                color: palette.text,
                                letterSpacing: 0.8,
                                lineHeight: 1,
                            }}
                        >
                            Floradelic
                        </span>
                    </div>

                    {/* Desktop Nav Links */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        {/* Nav items — hidden on mobile */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                            className="desktop-nav"
                        >
                            {navLinks.map(({ key, label, path }) => {
                                const isActive = activePage === key;
                                const count =
                                    key === "cart" ? cartCount : key === "wishlist" ? wishlist.length : 0;

                                return (
                                    <div
                                        key={key}
                                        style={{ position: "relative" }}
                                        onMouseEnter={() => setHoveredLink(key)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        <button
                                            onClick={() => handleNavClick(path)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                padding: "8px 14px",
                                                fontSize: 13.5,
                                                fontWeight: isActive ? 600 : 450,
                                                color: isActive ? palette.blushDeep : palette.textMuted,
                                                fontFamily: "'DM Sans', sans-serif",
                                                letterSpacing: 0.2,
                                                transition: "color 0.2s ease",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 5,
                                                position: "relative",
                                                borderRadius: 8,
                                            }}
                                        >
                                            {label}
                                            {count > 0 && (
                                                <span
                                                    style={{
                                                        background: palette.blushMid,
                                                        color: "#fff",
                                                        borderRadius: "50%",
                                                        minWidth: 18,
                                                        height: 18,
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        animation: "badgeBounce 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                                                        padding: "0 3px",
                                                    }}
                                                >
                                                    {count}
                                                </span>
                                            )}
                                            {/* Animated underline */}
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    bottom: 4,
                                                    left: 14,
                                                    right: 14,
                                                    height: 1.5,
                                                    background: palette.blushDeep,
                                                    borderRadius: 2,
                                                    transform: isActive || hoveredLink === key ? "scaleX(1)" : "scaleX(0)",
                                                    transformOrigin: "left",
                                                    transition: "transform 0.25s ease",
                                                }}
                                            />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => handleNavClick("/checkout")}
                            style={{
                                background: "linear-gradient(135deg, #B19CD9, #8A6EB8)",
                                color: "#fff",
                                border: "none",
                                borderRadius: 100,
                                padding: "9px 22px",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: "pointer",
                                fontFamily: "'DM Sans', sans-serif",
                                boxShadow: "0 4px 16px rgba(177, 156, 217, 0.35)",
                                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                                letterSpacing: 0.2,
                                marginLeft: 6,
                                whiteSpace: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px) scale(1.02)";
                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(232, 160, 174, 0.55)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 16px rgba(232, 160, 174, 0.45)";
                            }}
                        >
                            Order Now
                        </button>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                display: "none",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 8,
                                color: palette.text,
                                fontSize: 22,
                                marginLeft: 4,
                            }}
                            className="hamburger-btn"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {mobileOpen && (
                    <div
                        style={{
                            background: "rgba(253, 246, 238, 0.97)",
                            backdropFilter: "blur(20px)",
                            borderTop: "1px solid rgba(232, 160, 174, 0.2)",
                            padding: "16px 24px 24px",
                            animation: "drawerSlide 0.25s ease",
                        }}
                    >
                        {navLinks.map(({ key, label, path }) => {
                            const isActive = activePage === key;
                            const count =
                                key === "cart" ? cartCount : key === "wishlist" ? wishlist.length : 0;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleNavClick(path)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        background: isActive ? palette.blushLight : "transparent",
                                        border: "none",
                                        borderRadius: 12,
                                        padding: "13px 16px",
                                        marginBottom: 4,
                                        fontSize: 15,
                                        fontWeight: isActive ? 600 : 400,
                                        color: isActive ? palette.blushDeep : palette.text,
                                        fontFamily: "'DM Sans', sans-serif",
                                        cursor: "pointer",
                                        textAlign: "left",
                                    }}
                                >
                                    {label}
                                    {count > 0 && (
                                        <span
                                            style={{
                                                background: palette.blushMid,
                                                color: "#fff",
                                                borderRadius: 100,
                                                padding: "2px 9px",
                                                fontSize: 11,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => handleNavClick("/checkout")}
                            style={{
                                width: "100%",
                                marginTop: 8,
                                background: "linear-gradient(135deg, #B19CD9, #8A6EB8)",
                                color: "#fff",
                                border: "none",
                                borderRadius: 100,
                                padding: "13px",
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer",
                                fontFamily: "'DM Sans', sans-serif",
                                boxShadow: "0 4px 16px rgba(232, 160, 174, 0.45)",
                            }}
                        >
                            Order Now
                        </button>
                    </div>
                )}
            </nav>

            {/* Responsive styles injected */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; align-items: center; }
        }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
        }
      `}</style>
        </>
    );
}
