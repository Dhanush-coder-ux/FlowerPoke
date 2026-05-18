import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { palette } from "../utils/constants";
import { TextInput } from "../components/Inputs/Inputs";
import FadeIn from "../components/FadeIn";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, setCart, showToast, setOrderDetails } = useContext(AppContext);

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  if (cart.length === 0) {
    return (
      <div
        style={{
          paddingTop: 120,
          minHeight: "80vh",
          background: palette.cream,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 72, marginBottom: 20, userSelect: "none" }}>🛒</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: palette.text, marginBottom: 8 }}>
            No items to checkout
          </h2>
          <button
            onClick={() => navigate("/shop")}
            style={{
              background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
              color: "#fff",
              border: "none",
              borderRadius: 100,
              padding: "13px 32px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 8px 24px rgba(232,160,174,0.4)",
              marginTop: 20
            }}
          >
            Explore Flowers
          </button>
        </div>
      </div>
    );
  }

  // Calculate pricing breakdown
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delCost = cart.reduce((acc, item) => acc + (item.deliveryCost || 0) * item.quantity, 0);
  const wrapCost = cart.reduce((acc, item) => acc + (item.personalization?.wrapperStyle?.price || 0) * item.quantity, 0);
  const total = subtotal + delCost + wrapCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      showToast("Please complete all shipping details 🌸");
      return;
    }

    setOrderDetails({
      id: "PK-" + Math.floor(100000 + Math.random() * 900000),
      name: form.name,
      address: form.address,
      items: [...cart],
      total,
      deliveryType: cart[0]?.deliveryType || "Same-day",
      deliveryDate: cart[0]?.deliveryDate || "",
      deliverySlot: cart[0]?.deliverySlot || "",
      personalization: cart[0]?.personalization || {},
    });

    setCart([]);
    showToast("Order placed successfully! 🌸✨");
    navigate("/success");
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
              Secure Checkout
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
              Complete Your Order
            </h1>
          </div>
        </FadeIn>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Left column - Recipient & Custom Details Overview */}
          <div style={{ flex: "2 1 560px", display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Address */}
            <FadeIn>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: "28px 28px 24px",
                  boxShadow: "0 2px 16px rgba(45,31,40,0.06)",
                  border: "1px solid rgba(242,196,206,0.2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: palette.blushLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                    📍
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 600, color: palette.text, margin: 0 }}>
                    Recipient Address
                  </h3>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <TextInput label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Who is receiving this?" />
                  </div>
                  <TextInput label="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                  <TextInput label="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <TextInput label="Delivery Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Flat/House No, Street, City, Pincode" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Configured Item Customization Overview */}
            <FadeIn delay={0.08}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: "28px 28px 24px",
                  boxShadow: "0 2px 16px rgba(45,31,40,0.06)",
                  border: "1px solid rgba(242,196,206,0.2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "#EEE8FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                    🌸
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 600, color: palette.text, margin: 0 }}>
                    Order Configuration Overview
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {cart.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      style={{
                        paddingBottom: idx === cart.length - 1 ? 0 : 20,
                        borderBottom: idx === cart.length - 1 ? "none" : "1px solid rgba(45,31,40,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12
                      }}
                    >
                      {/* Product identity */}
                      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 12,
                            objectFit: "cover",
                            border: "1px solid rgba(45,31,40,0.1)"
                          }}
                        />
                        <div>
                          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: palette.text, margin: 0 }}>
                            {item.name} <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.textMuted }}>× {item.quantity}</span>
                          </h4>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: palette.blushMid }}>
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Configured preferences details */}
                      <div
                        style={{
                          background: palette.cream,
                          borderRadius: 14,
                          padding: 14,
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                          fontSize: 12.5,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {/* Delivery */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", alignItems: "center" }}>
                          <span style={{ fontWeight: 600, color: palette.text }}>🚚 Delivery Style:</span>
                          <span style={{ color: palette.textMuted }}>
                            {item.deliveryType || "Same-day"} • {item.deliveryDate || "Standard Date"} ({item.deliverySlot || "Standard timings"})
                          </span>
                        </div>

                        {/* Wrap & Msg */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <span style={{ fontWeight: 600, color: palette.text }}>🎁 Personalization:</span>
                            <span style={{ color: palette.textMuted }}>
                              {item.personalization?.wrapperStyle ? `${item.personalization.wrapperStyle.icon} ${item.personalization.wrapperStyle.name}` : "Standard wrap"}
                            </span>
                          </div>
                          {item.personalization?.giftMessage && (
                            <div style={{ marginLeft: 16, fontStyle: "italic", color: palette.blushDeep, marginTop: 2 }}>
                              💬 "{item.personalization.giftMessage}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right column — Order summary */}
          <div style={{ flex: "1 1 300px" }}>
            <FadeIn delay={0.16}>
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
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: palette.text, margin: "0 0 22px" }}>
                  Payment Details
                </h3>

                {/* Items preview list */}
                <div style={{ marginBottom: 16 }}>
                  {cart.slice(0, 3).map((item, idx) => (
                    <div key={`${item.id}-${idx}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                      <span style={{ color: palette.textMuted, maxWidth: "65%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={{ fontWeight: 600, color: palette.text }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {cart.length > 3 && (
                    <div style={{ fontSize: 12, color: palette.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>
                      +{cart.length - 3} more item(s)
                    </div>
                  )}
                </div>

                <div style={{ borderTop: "1px solid rgba(45,31,40,0.07)", paddingTop: 16, marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: palette.textMuted }}>Bag Subtotal</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: palette.text }}>₹{subtotal.toLocaleString()}</span>
                  </div>

                  {wrapCost > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: palette.textMuted }}>Wrapping Add-ons</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: palette.text }}>+₹{wrapCost.toLocaleString()}</span>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: palette.textMuted }}>Delivery Option surcharges</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 600, color: delCost === 0 ? "#2E6A2C" : palette.text }}>
                      {delCost === 0 ? "Free" : `+₹${delCost.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, background: palette.blushLight, borderRadius: 12, padding: "12px 16px" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: palette.text }}>Total Due</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: palette.text, letterSpacing: "-0.5px" }}>₹{total.toLocaleString()}</span>
                </div>

                <motion.button
                  type="submit"
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
                    transition: "box-shadow 0.25s ease",
                  }}
                >
                  Pay ₹{total.toLocaleString()} →
                </motion.button>
              </div>
            </FadeIn>
          </div>
        </form>
      </div>
    </div>
  );
}
