import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "../data/flowers";
import { palette } from "../utils/constants";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import DeliveryBadge from "../components/DeliveryBadge";
import StarRating from "../components/ProductCard/StarRating";
import FadeIn from "../components/FadeIn";
import PersonalizationForm from "../components/delivery/PersonalizationForm";
import { Heart, Check, Leaf, Gift, RefreshCcw, SearchX, ArrowLeft, ArrowRight } from "lucide-react";

const deliveryTypes = [
  { id: "Same-day", name: "Same Day", surcharge: 0, desc: "Standard slots", icon: "🚚" },
  { id: "Midnight", name: "Midnight", surcharge: 250, desc: "Late night delivery", icon: "🌙" },
  { id: "Express", name: "Express", surcharge: 150, desc: "2-hour delivery", icon: "⚡" },
  { id: "International", name: "International", surcharge: 500, desc: "4-7 business days", icon: "✈️" }
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [addedFlash, setAddedFlash] = useState(false);

  const product = PRODUCTS.find((p) => p.id === parseInt(id));
  const { onAddToCart } = useCart();
  const { wishlist, onWishlist } = useWishlist();

  // Carousel State
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setActiveImgIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveImgIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleThumbnailClick = (idx) => {
    setDirection(idx > activeImgIndex ? 1 : -1);
    setActiveImgIndex(idx);
  };

  // Delivery Configuration States
  const [delType, setDelType] = useState("Same-day");
  const [delDate, setDelDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [delSlot, setDelSlot] = useState("1 PM - 5 PM");
  const [customTime, setCustomTime] = useState("");
  const [personalization, setPersonalization] = useState({
    giftMessage: "",
    wrapperStyle: { id: "classic", name: "Classic Ribbon", icon: "🎀", price: 0 }
  });

  const carouselImages = product
    ? [
        product.image,
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-147050967868-88cb44cb2753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    : [];

  const getSlotsForType = (type) => {
    let standard = [];
    switch (type) {
      case "Same-day":
        standard = ["9 AM - 1 PM", "1 PM - 5 PM", "5 PM - 9 PM"];
        break;
      case "Midnight":
        standard = ["11:30 PM - 12:00 AM"];
        break;
      case "Express":
        standard = ["10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM", "6 PM - 8 PM"];
        break;
      case "International":
        standard = ["Standard Delivery (4-7 business days)"];
        break;
      default:
        standard = [];
    }
    return [...standard, "Custom Time..."];
  };

  // Auto update slot when type changes
  useEffect(() => {
    const available = getSlotsForType(delType);
    if (available.length > 0) {
      setDelSlot(available[0]);
    }
  }, [delType]);

  if (!product) {
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SearchX size={72} color={palette.textMuted} strokeWidth={1} />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 32,
              color: palette.text,
              marginTop: 16,
            }}
          >
            Flower Not Found
          </h2>
          <button
            onClick={() => navigate("/shop")}
            style={{
              marginTop: 20,
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
            }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  // Dynamic price calculation
  const surcharge = deliveryTypes.find((d) => d.id === delType)?.surcharge || 0;
  const wrapCost = personalization?.wrapperStyle?.price || 0;
  const singleItemTotal = product.price + surcharge + wrapCost;

  const handleAddToCart = () => {
    const finalSlot = delSlot === "Custom Time..." ? (customTime.trim() || "Custom Time Requested") : delSlot;
    const customOptions = {
      deliveryType: delType,
      deliveryDate: delDate,
      deliverySlot: finalSlot,
      personalization: personalization,
      deliveryCost: surcharge,
    };
    onAddToCart(product, qty, customOptions);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1500);
  };

  return (
    <div
      style={{
        paddingTop: 72,
        minHeight: "100vh",
        background: palette.cream,
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: "40px clamp(16px, 5vw, 64px)",
          width: "100%",
        }}
      >
        <FadeIn>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: palette.textMuted,
            }}
          >
            <button
              onClick={() => navigate("/")}
              style={{ background: "none", border: "none", cursor: "pointer", color: palette.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: 0 }}
            >
              Home
            </button>
            <span>›</span>
            <button
              onClick={() => navigate("/shop")}
              style={{ background: "none", border: "none", cursor: "pointer", color: palette.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: 0 }}
            >
              Shop
            </button>
            <span>›</span>
            <span style={{ color: palette.text, fontWeight: 500 }}>{product.name}</span>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 26,
              overflow: "hidden",
              boxShadow: "0 16px 56px rgba(45,31,40,0.09)",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              border: "1px solid rgba(242,196,206,0.2)",
            }}
          >
            {/* Left Column: Product image carousel */}
            <div
              style={{
                flex: "1 1 500px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                background: `linear-gradient(145deg, ${palette.blushLight}30, ${palette.lavenderLight}30)`,
                borderRight: "1px solid rgba(242,196,206,0.15)",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {/* Main Image View */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 680,
                  aspectRatio: "1/1",
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  background: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(45,31,40,0.06)",
                }}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={activeImgIndex}
                    src={carouselImages[activeImgIndex]}
                    alt={`${product.name} view`}
                    custom={direction}
                    variants={{
                      enter: (dir) => ({
                        x: dir > 0 ? 280 : dir < 0 ? -280 : 0,
                        opacity: 0
                      }),
                      center: {
                        x: 0,
                        opacity: 1
                      },
                      exit: (dir) => ({
                        x: dir < 0 ? 280 : dir > 0 ? -280 : 0,
                        opacity: 0
                      })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0
                    }}
                  />
                </AnimatePresence>
                
                {/* Carousel Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.85)",
                    border: "none",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    color: palette.text,
                    zIndex: 10,
                  }}
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.85)",
                    border: "none",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    color: palette.text,
                    zIndex: 10,
                  }}
                >
                  <ArrowRight size={16} />
                </button>

                {discount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "#3A7A38",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 100,
                      fontFamily: "'DM Sans', sans-serif",
                      zIndex: 10,
                    }}
                  >
                    -{discount}% off
                  </div>
                )}
              </div>

              {/* Thumbnails row */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {carouselImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      overflow: "hidden",
                      border: `2.5px solid ${activeImgIndex === idx ? palette.blushMid : "transparent"}`,
                      cursor: "pointer",
                      boxShadow: activeImgIndex === idx ? "0 4px 12px rgba(232,160,174,0.3)" : "none",
                      background: "#fff",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <img src={img} alt="thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Product details & personalization */}
            <div style={{ flex: "1 1 500px", padding: "clamp(28px, 5vw, 56px)" }}>
              <div style={{ marginBottom: 14 }}>
                <DeliveryBadge type={product.badge} />
              </div>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontWeight: 600,
                  color: palette.text,
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.3px",
                }}
              >
                {product.name}
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14.5,
                  color: palette.textMuted,
                  lineHeight: 1.75,
                  marginBottom: 20,
                  fontWeight: 400,
                }}
              >
                {product.desc}
              </p>

              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 24,
                  paddingBottom: 22,
                  borderBottom: "1px solid rgba(45,31,40,0.08)",
                }}
              >
                <StarRating rating={product.rating} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12.5,
                    color: palette.textMuted,
                  }}
                >
                  ({product.reviews} reviews)
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: palette.blushMid,
                    background: palette.blushLight,
                    padding: "2px 8px",
                    borderRadius: 100,
                  }}
                >
                  {product.category}
                </span>
              </div>

              {/* Delivery preferences Card */}
              <div
                style={{
                  background: palette.cream,
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 24,
                  border: "1px solid rgba(45,31,40,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🚚</span>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 18.5,
                      fontWeight: 600,
                      color: palette.text,
                      margin: 0,
                    }}
                  >
                    Delivery Preferences
                  </h3>
                </div>

                {/* Delivery Type selector grid */}
                <div>
                  <label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: palette.textMuted,
                      display: "block",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Select Delivery Type
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 8,
                    }}
                  >
                    {deliveryTypes.map((t) => {
                      const isSelected = delType === t.id;
                      return (
                        <motion.div
                          key={t.id}
                          onClick={() => setDelType(t.id)}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            padding: "10px",
                            borderRadius: 12,
                            border: `1.5px solid ${isSelected ? palette.blushMid : "rgba(45,31,40,0.1)"}`,
                            background: isSelected ? "#fff" : "rgba(255,255,255,0.5)",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            boxShadow: isSelected ? "0 4px 16px rgba(232,160,174,0.12)" : "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 14 }}>{t.icon}</span>
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                color: palette.text,
                              }}
                            >
                              {t.name}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 10,
                              color: palette.textMuted,
                            }}
                          >
                            {t.surcharge === 0 ? "Free" : `+₹${t.surcharge}`}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Scheduling Details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: palette.textMuted,
                        display: "block",
                        marginBottom: 6,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={delDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDelDate(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 10,
                        border: "1px solid rgba(45,31,40,0.15)",
                        background: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: palette.text,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: palette.textMuted,
                        display: "block",
                        marginBottom: 6,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Timings Slot
                    </label>
                    <select
                      value={delSlot}
                      onChange={(e) => setDelSlot(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 10,
                        border: "1px solid rgba(45,31,40,0.15)",
                        background: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: palette.text,
                        outline: "none",
                      }}
                    >
                      {getSlotsForType(delType).map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Customizable Time Option Input */}
                {delSlot === "Custom Time..." && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 4 }}
                  >
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        color: palette.textMuted,
                        display: "block",
                        marginBottom: 6,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Enter Custom Timing
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 10:30 AM, or 3 PM - 4:30 PM"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 10,
                        border: `1.5px solid ${palette.blushMid}`,
                        background: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: palette.text,
                        outline: "none",
                      }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Personalization Section */}
              <div style={{ marginBottom: 28 }}>
                <PersonalizationForm onUpdate={setPersonalization} />
              </div>

              {/* Dynamic Price Breakdown */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${palette.blushLight}40, ${palette.lavenderLight}40)`,
                  borderRadius: 16,
                  padding: "16px 20px",
                  marginBottom: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: palette.textMuted }}>Base Flower Arrangement</span>
                  <span style={{ fontWeight: 600 }}>₹{(product.price * qty).toLocaleString()}</span>
                </div>
                {surcharge > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: palette.textMuted }}>Delivery Option surcharge ({delType})</span>
                    <span style={{ fontWeight: 600 }}>+₹{(surcharge * qty).toLocaleString()}</span>
                  </div>
                )}
                {wrapCost > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: palette.textMuted }}>Personalized Wrapping Add-on</span>
                    <span style={{ fontWeight: 600 }}>+₹{(wrapCost * qty).toLocaleString()}</span>
                  </div>
                )}
                <div
                  style={{
                    borderTop: "1px solid rgba(45,31,40,0.08)",
                    marginTop: 6,
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  <span style={{ color: palette.text }}>Grand Total</span>
                  <span style={{ color: palette.text }}>₹{(singleItemTotal * qty).toLocaleString()}</span>
                </div>
              </div>

              {/* Quantity & CTA */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                {/* Qty stepper */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: palette.cream,
                    borderRadius: 100,
                    border: "1px solid rgba(45,31,40,0.12)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{
                      background: "none",
                      border: "none",
                      width: 42,
                      height: 42,
                      fontSize: 20,
                      cursor: "pointer",
                      color: palette.text,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 300,
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      minWidth: 32,
                      textAlign: "center",
                      color: palette.text,
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    style={{
                      background: "none",
                      border: "none",
                      width: 42,
                      height: 42,
                      fontSize: 20,
                      cursor: "pointer",
                      color: palette.text,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 300,
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    minWidth: 160,
                    background: addedFlash
                      ? "linear-gradient(135deg, #3A7A38, #2E6A2C)"
                      : `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`,
                    color: "#fff",
                    border: "none",
                    borderRadius: 100,
                    padding: "14px 20px",
                    fontSize: 14.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: addedFlash
                      ? "0 8px 24px rgba(58,122,56,0.35)"
                      : "0 8px 28px rgba(232,160,174,0.4)",
                    transition: "background 0.35s ease, box-shadow 0.25s ease",
                    letterSpacing: 0.2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  {addedFlash ? <><Check size={16} strokeWidth={2.5} /> Added to Cart!</> : `Add to Cart · ₹${(singleItemTotal * qty).toLocaleString()}`}
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  onClick={() => onWishlist(product.id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `1.5px solid ${isWishlisted ? palette.blushMid : "rgba(45,31,40,0.14)"}`,
                    background: isWishlisted ? palette.blushLight : "transparent",
                    cursor: "pointer",
                    fontSize: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s ease",
                    flexShrink: 0,
                    color: isWishlisted ? palette.blushMid : palette.textMuted,
                  }}
                >
                  <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2} />
                </motion.button>
              </div>

              {/* Features */}
              <div
                style={{
                  marginTop: 28,
                  paddingTop: 22,
                  borderTop: "1px solid rgba(45,31,40,0.08)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {[
                  { icon: <Leaf size={14} />, text: "Farm Fresh" },
                  { icon: <Gift size={14} />, text: "Gift Wrapped" },
                  { icon: <RefreshCcw size={14} />, text: "Free Returns" }
                ].map((f) => (
                  <div
                    key={f.text}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: palette.textMuted,
                      background: palette.cream,
                      borderRadius: 100,
                      padding: "6px 14px",
                      border: "1px solid rgba(45,31,40,0.1)",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {f.icon} {f.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
