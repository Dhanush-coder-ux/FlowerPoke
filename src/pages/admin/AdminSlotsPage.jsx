import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { palette } from "../../utils/constants";
import SlotManagementTable from "../../components/admin/SlotManagementTable";
import FadeIn from "../../components/FadeIn";
import { TextInput } from "../../components/Inputs/Inputs";

export default function AdminSlotsPage() {
  const { pricingRules, updatePricingRule } = useContext(AdminContext);

  return (
    <div>
      <FadeIn>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: palette.text, margin: "0 0 8px" }}>
            Delivery Slots & Pricing
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.textMuted, margin: 0 }}>
            Configure capacity, availability, and dynamic pricing rules.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
          {/* Main Slots Table */}
          <div style={{ flex: 1 }}>
            <SlotManagementTable />
          </div>

          {/* Pricing Rules Sidebar */}
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(45,31,40,0.05)", border: "1px solid rgba(45,31,40,0.06)" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: palette.text, margin: "0 0 20px" }}>
                Pricing Rules
              </h3>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 8, textTransform: "uppercase" }}>
                  Express Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={pricingRules.expressFee}
                  onChange={(e) => updatePricingRule("expressFee", Number(e.target.value))}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(45,31,40,0.1)", background: palette.cream, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 8, textTransform: "uppercase" }}>
                  Midnight Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={pricingRules.midnightFee}
                  onChange={(e) => updatePricingRule("midnightFee", Number(e.target.value))}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(45,31,40,0.1)", background: palette.cream, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, display: "block", marginBottom: 8, textTransform: "uppercase" }}>
                  Free Delivery Threshold (₹)
                </label>
                <input
                  type="number"
                  value={pricingRules.freeDeliveryThreshold}
                  onChange={(e) => updatePricingRule("freeDeliveryThreshold", Number(e.target.value))}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(45,31,40,0.1)", background: palette.cream, fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <button style={{ width: "100%", background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Save Rules
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
