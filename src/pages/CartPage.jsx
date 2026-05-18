import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { palette } from "../utils/constants";
import EmptyState from "../components/EmptyState/EmptyState";
import FadeIn from "../components/FadeIn";
import { ShoppingBag, Trash2 } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  if (cart.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag size={72} color={palette.blushMid} strokeWidth={1.5} />}
        title="Your cart is empty"
        description="Explore our beautiful collection and add your favourites"
        actionText="Browse Flowers"
        onAction={() => navigate("/shop")}
      />
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleQuantity = (item, amt) => {
    const newQty = item.quantity + amt;
    if (newQty <= 0) {
      handleRemove(item.id);
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
      );
    }
  };

  return (
    <div style={{ paddingTop: 90, minHeight: "100vh", background: palette.cream }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "40px clamp(16px, 4vw, 32px)" }}>
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
              Review your selections
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
              Your Cart ({cart.length})
            </h1>
          </div>
        </FadeIn>

        <div
          style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* Cart items */}
          <div style={{ flex: "2 1 560px" }}>
            {cart.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "18px 22px",
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    boxShadow: "0 2px 14px rgba(45,31,40,0.05)",
                    border: "1px solid rgba(242,196,206,0.2)",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: 76,
                      height: 76,
                      background: `linear-gradient(135deg, ${palette.blushLight}, ${palette.lavenderLight})`,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 34,
                      userSelect: "none",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    {item.image?.startsWith("http") ? (
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      item.image
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 19,
                        fontWeight: 600,
                        color: palette.text,
                        margin: "0 0 3px",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12.5,
                        color: palette.textMuted,
                        margin: 0,
                        fontWeight: 400,
                      }}
                    >
                      {item.category}
                    </p>
                  </div>

                  {/* Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Qty stepper */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0,
                        background: palette.cream,
                        borderRadius: 100,
                        border: "1px solid rgba(45,31,40,0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => handleQuantity(item, -1)}
                        style={{
                          background: "none",
                          border: "none",
                          width: 36,
                          height: 36,
                          fontSize: 18,
                          cursor: "pointer",
                          color: palette.text,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 300,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = palette.blushLight)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          minWidth: 28,
                          textAlign: "center",
                          color: palette.text,
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity(item, 1)}
                        style={{
                          background: "none",
                          border: "none",
                          width: 36,
                          height: 36,
                          fontSize: 18,
                          cursor: "pointer",
                          color: palette.text,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 300,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = palette.blushLight)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right", minWidth: 80 }}>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 16,
                          fontWeight: 700,
                          color: palette.text,
                          letterSpacing: "-0.2px",
                        }}
                      >
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Remove */}
                    <motion.button
                      onClick={() => handleRemove(item.id)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: 16,
                        cursor: "pointer",
                        color: palette.textMuted,
                        padding: 6,
                        borderRadius: 8,
                        transition: "background 0.15s",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FEE8ED")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* Order summary */}
          <div style={{ flex: "1 1 300px" }}>
            <FadeIn delay={0.15}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: 28,
                  boxShadow: "0 4px 24px rgba(45,31,40,0.07)",
                  border: "1px solid rgba(242,196,206,0.25)",
                  position: "sticky",
                  top: 88,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: palette.text,
                    margin: "0 0 22px",
                  }}
                >
                  Order Summary
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: palette.textMuted }}>
                    Subtotal ({cart.length} items)
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: palette.text }}>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    paddingBottom: 20,
                    borderBottom: "1px solid rgba(45,31,40,0.07)",
                  }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: palette.textMuted }}>
                    Shipping
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: "#2E6A2C" }}>
                    Free
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 24,
                  }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: palette.text }}>
                    Total
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, color: palette.text, letterSpacing: "-0.5px" }}>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <motion.button
                  onClick={() => navigate("/checkout")}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
                    color: "#fff",
                    border: "none",
                    borderRadius: 100,
                    padding: "15px",
                    fontSize: 14.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: "0 8px 28px rgba(232,160,174,0.4)",
                    letterSpacing: 0.2,
                    transition: "box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 14px 40px rgba(232,160,174,0.55)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 8px 28px rgba(232,160,174,0.4)")}
                >
                  Proceed to Checkout →
                </motion.button>

                <button
                  onClick={() => navigate("/shop")}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    color: palette.textMuted,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: 12,
                    padding: 8,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = palette.text)}
                  onMouseLeave={(e) => (e.target.style.color = palette.textMuted)}
                >
                  ← Continue Shopping
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
