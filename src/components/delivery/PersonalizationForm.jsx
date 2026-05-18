import { useState } from "react";
import { motion } from "framer-motion";
import { palette } from "../../utils/constants";
import { TextInput } from "../Inputs/Inputs";

const wrapperStyles = [
  { id: "classic", name: "Classic Ribbon", icon: "🎀", price: 0 },
  { id: "premium", name: "Premium Velvet", icon: "🎁", price: 150 },
  { id: "glass", name: "Glass Vase", icon: "🏺", price: 450 },
];

export default function PersonalizationForm({ onUpdate }) {
  const [msg, setMsg] = useState("");
  const [wrapper, setWrapper] = useState("classic");

  const handleUpdate = (newMsg, newWrap) => {
    onUpdate({
      giftMessage: newMsg,
      wrapperStyle: wrapperStyles.find(w => w.id === newWrap)
    });
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h4
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: palette.text,
          marginBottom: 12,
        }}
      >
        Personalize Your Gift
      </h4>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          border: "1px solid rgba(45,31,40,0.1)",
        }}
      >
        <TextInput
          label="Gift Message (Free)"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
            handleUpdate(e.target.value, wrapper);
          }}
          placeholder="E.g. Happy Anniversary my love!"
          style={{ marginBottom: 16 }}
        />

        <div>
          <label
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11.5,
              fontWeight: 600,
              color: palette.textMuted,
              display: "block",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Wrapping Style
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
            {wrapperStyles.map((w) => {
              const isSelected = wrapper === w.id;
              return (
                <motion.div
                  key={w.id}
                  onClick={() => {
                    setWrapper(w.id);
                    handleUpdate(msg, w.id);
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "12px",
                    borderRadius: 12,
                    border: `1.5px solid ${isSelected ? palette.blushMid : "rgba(45,31,40,0.1)"}`,
                    background: isSelected ? palette.blushLight : "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{w.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: palette.text,
                      }}
                    >
                      {w.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        color: palette.textMuted,
                      }}
                    >
                      {w.price === 0 ? "Free" : `+₹${w.price}`}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
