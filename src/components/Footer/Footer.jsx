import { useNavigate } from "react-router-dom";
import { palette } from "../../utils/constants";

const footerLinks = [
  {
    title: "Shop",
    links: ["All Flowers", "Roses", "Orchids", "Lilies", "Gift Boxes"],
  },
  {
    title: "Occasions",
    links: ["Birthday", "Anniversary", "Valentine's", "Mother's Day"],
  },
  {
    title: "Delivery",
    links: ["Same-Day Delivery", "2-Hour Express", "Midnight Magic", "Track Order"],
  },
  {
    title: "Help",
    links: ["FAQ", "Contact Us", "Returns", "Careers"],
  },
];

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1E1318 0%, #2D1F28 100%)",
        padding: "clamp(48px, 6vw, 72px) clamp(16px, 4vw, 40px) 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(4, 1fr)",
            gap: "clamp(24px, 4vw, 48px)",
            marginBottom: 56,
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "1 / 2" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
                cursor: "pointer",
              }}
              onClick={() => { navigate("/"); window.scrollTo({ top: 0 }); }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #B19CD9, #E1D5F0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  boxShadow: "0 4px 12px rgba(177, 156, 217, 0.25)",
                  flexShrink: 0,
                }}
              >
                🌸
              </div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 21,
                  color: "#fff",
                  fontWeight: 600,
                  letterSpacing: 0.8,
                }}
              >
                Floradelic
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.75,
                margin: "0 0 22px",
                maxWidth: 220,
              }}
            >
              Premium floral gifting for life's most cherished moments. Handcrafted. Delivered with love.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {["📸", "🐦", "💬", "📱"].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: 1.8,
                  marginBottom: 18,
                  margin: "0 0 18px",
                }}
              >
                {title}
              </h4>
              {links.map((link) => (
                <div
                  key={link}
                  onClick={handleLinkClick}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.42)",
                    marginBottom: 11,
                    cursor: "pointer",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    display: "inline-block",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "rgba(255,255,255,0.82)";
                    e.target.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255,255,255,0.42)";
                    e.target.style.transform = "translateX(0)";
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: 0.2,
            }}
          >
            © 2026 Floradelic. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.25)")}
              >
                {item}
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Made with ❤️ in India
          </span>
        </div>
      </div>

      {/* Responsive grid collapse */}
      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
          }
          footer > div > div:first-of-type > div:first-child {
            grid-column: 1 / 3 !important;
          }
        }
        @media (max-width: 540px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
