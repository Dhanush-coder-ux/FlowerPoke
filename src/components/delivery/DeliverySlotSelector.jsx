import { useContext } from "react";
import { motion } from "framer-motion";
import { palette } from "../../utils/constants";
import { AdminContext } from "../../context/AdminContext";
import { Check, Clock, Moon, Rocket } from "lucide-react";

export default function DeliverySlotSelector({ selectedSlot, onSelectSlot, isToday }) {
  const { slots, pricingRules } = useContext(AdminContext);

  // Filter slots based on date (if today, hide past slots - just mock this for now by showing all active)
  // Or just show standard available slots
  const availableSlots = slots.filter(s => s.active);

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
        <h4
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: palette.text,
            margin: 0,
          }}
        >
          Select Time Slot
        </h4>
        <span style={{ fontSize: 11, color: palette.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
          Dynamic availability based on your area
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {availableSlots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          
          let color = palette.text;
          let bg = "rgba(255,255,255,0.8)";
          let icon = <Clock size={18} />;
          let priceText = "Free";
          let priceVal = 0;
          
          if (slot.type === "Midnight") {
            color = "#6B44C4";
            icon = <Moon size={18} />;
            priceVal = pricingRules.midnightFee;
            priceText = `+₹${priceVal}`;
          } else if (slot.type === "Express") {
            color = "#C8621A";
            icon = <Rocket size={18} />;
            priceVal = pricingRules.expressFee;
            priceText = `+₹${priceVal}`;
          }

          const fillPercentage = (slot.booked / slot.capacity) * 100;
          const isFillingFast = fillPercentage > 75;

          return (
            <motion.div
              key={slot.id}
              onClick={() => onSelectSlot({ ...slot, cost: priceVal })}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              style={{
                padding: "16px",
                borderRadius: 16,
                border: `2px solid ${isSelected ? color : "rgba(45,31,40,0.1)"}`,
                background: isSelected ? `${color}0D` : bg,
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
              }}
            >
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "#fff",
                    color: "#fff",
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
              
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color }}>
                {icon}
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: isSelected ? color : palette.text,
                  }}
                >
                  {slot.label}
                </span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: priceVal > 0 ? color : "#2E6A2C",
                  }}
                >
                  {priceText}
                </span>
                
                {isFillingFast && !isSelected && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#A0404F",
                      background: "#FCE8D5",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    Filling Fast
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
