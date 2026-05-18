import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { palette } from "../../utils/constants";
import StatusBadge from "../../components/admin/StatusBadge";
import FadeIn from "../../components/FadeIn";

export default function AdminRidersPage() {
  const { riders } = useContext(AdminContext);

  return (
    <div>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: palette.text, margin: "0 0 8px" }}>
              Delivery Agents
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.textMuted, margin: 0 }}>
              Monitor rider availability and current locations.
            </p>
          </div>
          <button style={{ background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            + Add Rider
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {riders.map((r) => (
            <div key={r.id} style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(45,31,40,0.05)", border: "1px solid rgba(45,31,40,0.06)", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${palette.sageLight}, #B2C8B0)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                    🛵
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: palette.text }}>{r.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: palette.textMuted }}>ID: {r.id}</div>
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, background: palette.cream, padding: 12, borderRadius: 12 }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", marginBottom: 2 }}>Deliveries</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: palette.text }}>{r.deliveries} today</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", marginBottom: 2 }}>Location</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: palette.text }}>{r.location}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                <button style={{ flex: 1, background: "transparent", border: "1px solid rgba(45,31,40,0.1)", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Message</button>
                <button style={{ flex: 1, background: "#2E6A2C", color: "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Call</button>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
