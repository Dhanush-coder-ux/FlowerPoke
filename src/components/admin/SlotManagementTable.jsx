import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { palette } from "../../utils/constants";

export default function SlotManagementTable() {
  const { slots, toggleSlotStatus } = useContext(AdminContext);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 4px 20px rgba(45,31,40,0.05)",
        border: "1px solid rgba(45,31,40,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(45,31,40,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: palette.text, margin: 0 }}>
          Today's Delivery Slots
        </h3>
        <button style={{ background: palette.cream, border: "1px solid rgba(45,31,40,0.1)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          Edit Capacities
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#FAFAFA", borderBottom: "1px solid rgba(45,31,40,0.08)" }}>
              <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Slot Name</th>
              <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Type</th>
              <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Capacity (Booked/Total)</th>
              <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => {
              const fillPercentage = (slot.booked / slot.capacity) * 100;
              let fillStr = "Healthy";
              let fillCol = "#2E6A2C";
              if (fillPercentage >= 100) { fillStr = "Full"; fillCol = "#A0404F"; }
              else if (fillPercentage > 80) { fillStr = "Filling Fast"; fillCol = "#C8621A"; }

              return (
                <tr key={slot.id} style={{ borderBottom: "1px solid rgba(45,31,40,0.04)" }}>
                  <td style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: palette.text }}>
                    {slot.label}
                  </td>
                  <td style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.textMuted }}>
                    {slot.type}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 100, height: 6, background: palette.cream, borderRadius: 100, overflow: "hidden" }}>
                        <div style={{ width: `${Math.min(fillPercentage, 100)}%`, height: "100%", background: fillCol, borderRadius: 100 }} />
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: fillCol, width: 40 }}>
                        {slot.booked}/{slot.capacity}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100, background: slot.active ? "#E3EFE1" : "#FCE8D5", color: slot.active ? "#2E6A2C" : "#A0404F" }}>
                      {slot.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <button
                      onClick={() => toggleSlotStatus(slot.id)}
                      style={{
                        background: slot.active ? "transparent" : palette.blushLight,
                        border: `1px solid ${slot.active ? "rgba(45,31,40,0.1)" : palette.blushMid}`,
                        color: slot.active ? palette.text : palette.blushDeep,
                        padding: "6px 14px",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.2s"
                      }}
                    >
                      {slot.active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
