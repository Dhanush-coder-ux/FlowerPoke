import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { palette } from "../utils/constants";
import FadeIn from "../components/FadeIn";
import DeliveryMapPlaceholder from "../components/delivery/DeliveryMapPlaceholder";
import RiderInfoCard from "../components/delivery/RiderInfoCard";
import { CheckCircle2, Check, Package, Rocket, Flower2, Sparkles } from "lucide-react";

const trackingSteps = [
  { id: 0, label: "Order Confirmed", icon: <CheckCircle2 size={18} />, desc: "Your order has been placed" },
  { id: 1, label: "Bouquet Preparing", icon: <Flower2 size={18} />, desc: "Our florists are crafting your blooms" },
  { id: 2, label: "Packed & Ready", icon: <Package size={18} />, desc: "Carefully wrapped with love" },
  { id: 3, label: "Out for Delivery", icon: <Rocket size={18} />, desc: "On its way to you" },
  { id: 4, label: "Delivered", icon: <Sparkles size={18} />, desc: "Your flowers have arrived!" },
];

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const { orderDetails } = useContext(AppContext);

  const orderId = orderDetails?.id || "PK-" + Math.floor(100000 + Math.random() * 900000);
  const total = orderDetails?.total || 1499;
  const deliveryType = orderDetails?.deliveryType || "Standard";

  const getSlot = () => {
    if (deliveryType === "Express") return "within 2 hours today";
    if (deliveryType === "Midnight") return "tonight at 12:00 AM";
    return "in 2-3 business days";
  };

  // Active step: always show "Bouquet Preparing" as current step after order placed
  const activeStep = 1;

  return (
    <div
      style={{
        paddingTop: 90,
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${palette.blushLight} 0%, ${palette.cream} 40%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          padding: "40px clamp(16px, 4vw, 32px)",
          textAlign: "center",
        }}
      >
        <FadeIn>
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${palette.blushLight}, ${palette.lavenderLight})`,
              border: `2px solid ${palette.blushMid}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              margin: "0 auto 24px",
              boxShadow: "0 8px 32px rgba(232,160,174,0.35)",
              userSelect: "none",
              animation: "glowPulse 3s ease infinite",
              color: palette.blushMid,
            }}
          >
            <Flower2 size={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px, 5vw, 44px)",
              fontWeight: 600,
              color: palette.blushDeep || "#D0788A",
              margin: "0 0 10px",
              letterSpacing: "-0.3px",
            }}
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: palette.textMuted,
              marginBottom: 32,
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Your premium blooms are being arranged with care and will arrive{" "}
            <strong style={{ color: palette.text }}>{getSlot()}</strong>.
          </motion.p>

          {/* Order details card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: "24px 28px",
              textAlign: "left",
              boxShadow: "0 4px 24px rgba(45,31,40,0.07)",
              marginBottom: 28,
              border: "1px solid rgba(242,196,206,0.25)",
            }}
          >
            {[
              { label: "Order Reference", value: orderId, valueStyle: { fontWeight: 700, color: palette.text, fontFamily: "'DM Sans', monospace" } },
              { label: "Amount Charged", value: `₹${total.toLocaleString()}`, valueStyle: { fontWeight: 700, color: palette.text } },
              {
                label: "Delivery Mode",
                value: deliveryType,
                valueStyle: {
                  fontWeight: 600,
                  color: deliveryType === "Midnight" ? "#6B44C4" : deliveryType === "Express" ? "#C8621A" : "#2E6A2C",
                },
              },
              {
                label: "Estimated Arrival",
                value: getSlot(),
                valueStyle: { fontWeight: 600, color: "#2E6A2C" },
                last: true,
              },
            ].map(({ label, value, valueStyle, last }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: last ? 0 : 14,
                  paddingTop: last ? 14 : 0,
                  marginBottom: last ? 0 : 14,
                  borderTop: last ? "1px solid rgba(45,31,40,0.07)" : "none",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: palette.textMuted,
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    textAlign: "right",
                    ...valueStyle,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </motion.div>

          <FadeIn delay={0.5}>
            <DeliveryMapPlaceholder />
            <RiderInfoCard riderName="Rajesh Kumar" vehicle="MH 12 AB 3456" rating={4.9} />
          </FadeIn>

          {/* Order Tracking Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.5 }}
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: "24px 28px",
              textAlign: "left",
              boxShadow: "0 4px 24px rgba(45,31,40,0.07)",
              marginBottom: 32,
              border: "1px solid rgba(242,196,206,0.25)",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontWeight: 600,
                color: palette.text,
                margin: "0 0 22px",
              }}
            >
              Live Order Tracking
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {trackingSteps.map((step, i) => {
                const isDone = i < activeStep;
                const isActive = i === activeStep;
                const isPending = i > activeStep;

                return (
                  <div key={step.id} style={{ display: "flex", gap: 14, position: "relative" }}>
                    {/* Connector line */}
                    {i < trackingSteps.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 19,
                          top: 40,
                          bottom: 0,
                          width: 2,
                          background: isDone
                            ? `linear-gradient(180deg, ${palette.blushMid}, ${palette.blushMid})`
                            : "rgba(45,31,40,0.1)",
                          transition: "background 0.5s ease",
                        }}
                      />
                    )}

                    {/* Step icon */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: isDone
                          ? `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`
                          : isActive
                          ? palette.blushLight
                          : "rgba(45,31,40,0.06)",
                        border: isActive
                          ? `2px solid ${palette.blushMid}`
                          : "2px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        flexShrink: 0,
                        zIndex: 1,
                        boxShadow: isActive
                          ? `0 0 0 4px rgba(232,160,174,0.2), 0 4px 14px rgba(232,160,174,0.3)`
                          : isDone
                          ? "0 4px 14px rgba(232,160,174,0.25)"
                          : "none",
                        animation: isActive ? "glowPulse 2s ease infinite" : "none",
                        color: isDone ? "#fff" : isActive ? palette.blushDeep : palette.textMuted,
                      }}
                    >
                      {isDone ? <Check size={18} /> : step.icon}
                    </motion.div>

                    {/* Step content */}
                    <div style={{ paddingBottom: i < trackingSteps.length - 1 ? 24 : 0, paddingTop: 4 }}>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13.5,
                          fontWeight: isActive || isDone ? 600 : 400,
                          color: isActive
                            ? palette.blushDeep || "#D0788A"
                            : isDone
                            ? palette.text
                            : palette.textMuted,
                          marginBottom: 2,
                        }}
                      >
                        {step.label}
                        {isActive && (
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: 8,
                              background: palette.blushLight,
                              color: palette.blushDeep || "#D0788A",
                              fontSize: 10,
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: 100,
                              letterSpacing: 0.5,
                              verticalAlign: "middle",
                            }}
                          >
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: palette.textMuted,
                          fontWeight: 400,
                        }}
                      >
                        {step.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            onClick={() => navigate("/")}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
              color: "#fff",
              border: "none",
              borderRadius: 100,
              padding: "15px 44px",
              fontSize: 14.5,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 8px 28px rgba(232,160,174,0.4)",
              letterSpacing: 0.2,
            }}
          >
            Continue Shopping
          </motion.button>
        </FadeIn>
      </div>
    </div>
  );
}
