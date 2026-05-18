import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { palette } from "../../utils/constants";
import StatusBadge from "../../components/admin/StatusBadge";
import FadeIn from "../../components/FadeIn";

const filters = ["All", "Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const { orders } = useContext(AdminContext);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredOrders = activeFilter === "All" ? orders : orders.filter(o => o.status === activeFilter);

  return (
    <div>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: palette.text, margin: "0 0 8px" }}>
              Order Management
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.textMuted, margin: 0 }}>
              Track, update, and manage incoming deliveries.
            </p>
          </div>
          <button style={{ background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            + Create Order
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, overflowX: "auto", paddingBottom: 8 }}>
          {filters.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 100,
                  border: `1px solid ${isActive ? palette.blushMid : "rgba(45,31,40,0.1)"}`,
                  background: isActive ? palette.blushLight : "#fff",
                  color: isActive ? palette.blushDeep : palette.textMuted,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Orders Table */}
        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 20px rgba(45,31,40,0.05)", border: "1px solid rgba(45,31,40,0.06)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#FAFAFA", borderBottom: "1px solid rgba(45,31,40,0.08)" }}>
                  <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Order ID</th>
                  <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Customer</th>
                  <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Items</th>
                  <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Delivery Type</th>
                  <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Status</th>
                  <th style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid rgba(45,31,40,0.04)" }}>
                      <td style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: palette.text }}>{o.id}</td>
                      <td style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.text }}>{o.customer}</td>
                      <td style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.textMuted }}>{o.items} items</td>
                      <td style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.textMuted }}>{o.type}</td>
                      <td style={{ padding: "16px 24px" }}><StatusBadge status={o.status} /></td>
                      <td style={{ padding: "16px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: palette.text, textAlign: "right" }}>₹{o.total.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.textMuted }}>
                      No orders found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
