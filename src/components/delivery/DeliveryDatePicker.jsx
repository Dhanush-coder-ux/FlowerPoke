import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { palette } from "../../utils/constants";

export default function DeliveryDatePicker({ selectedDate, onSelectDate }) {
  const scrollRef = useRef(null);

  // Generate next 14 days
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      dateObj: d,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      isToday: i === 0,
      isTomorrow: i === 1,
      fullStr: d.toISOString().split("T")[0],
    };
  });

  return (
    <div style={{ marginBottom: 28 }}>
      <h4
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: palette.text,
          marginBottom: 12,
        }}
      >
        Select Delivery Date
      </h4>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 12,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {dates.map((d) => {
          const isSelected = selectedDate === d.fullStr;
          
          return (
            <motion.button
              key={d.fullStr}
              type="button"
              onClick={() => onSelectDate(d.fullStr)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                flexShrink: 0,
                scrollSnapAlign: "start",
                width: 72,
                height: 84,
                borderRadius: 16,
                background: isSelected ? palette.blushMid : "rgba(255,255,255,0.8)",
                border: `1.5px solid ${isSelected ? palette.blushMid : "rgba(45,31,40,0.1)"}`,
                color: isSelected ? "#fff" : palette.text,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: isSelected ? "0 4px 16px rgba(232,160,174,0.35)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  opacity: 0.8,
                  marginBottom: 2,
                  textTransform: "uppercase",
                }}
              >
                {d.isToday ? "Today" : d.isTomorrow ? "Tmrw" : d.dayName}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                {d.dayNum}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  opacity: 0.7,
                  textTransform: "uppercase",
                }}
              >
                {d.month}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Hide scrollbar injected style */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
