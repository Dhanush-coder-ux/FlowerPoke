import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { palette } from "../../utils/constants";
import DeliveryAnalyticsCard from "../../components/admin/DeliveryAnalyticsCard";
import StatusBadge from "../../components/admin/StatusBadge";
import FadeIn from "../../components/FadeIn";

export default function AdminDashboardPage() {
  const { orders } = useContext(AdminContext);

  const revenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;

  return (
    <div>
      <FadeIn>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: palette.text, margin: "0 0 8px" }}>
          Dashboard Overview
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.textMuted, marginBottom: 32 }}>
          Here's what's happening with your deliveries today.
        </p>

        {/* Analytics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 40 }}>
          <DeliveryAnalyticsCard title="Today's Revenue" value={`₹${revenue.toLocaleString()}`} trend="+14.5%" icon="💰" color="#C8621A" />
          <DeliveryAnalyticsCard title="Active Orders" value={orders.length} trend="+5.2%" icon="📦" color={palette.blushMid} />
          <DeliveryAnalyticsCard title="Pending Fulfillment" value={pendingOrders} icon="⏳" color="#2B7BBA" />
          <DeliveryAnalyticsCard title="Successfully Delivered" value={deliveredOrders} trend="+12.1%" icon="✅" color="#2E6A2C" />
        </div>

        {/* Recent Orders Preview */}
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(45,31,40,0.05)", border: "1px solid rgba(45,31,40,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: palette.text, margin: 0 }}>
              Recent Orders
            </h3>
            <button style={{ background: "none", border: "none", color: palette.blushMid, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              View All
            </button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#FAFAFA", borderBottom: "1px solid rgba(45,31,40,0.08)" }}>
                <th style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Order ID</th>
                <th style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Customer</th>
                <th style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Type</th>
                <th style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase" }}>Status</th>
                <th style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 4).map((o) => (
                <tr key={o.id} style={{ borderBottom: "1px solid rgba(45,31,40,0.04)" }}>
                  <td style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: palette.text }}>{o.id}</td>
                  <td style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.text }}>{o.customer}</td>
                  <td style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.textMuted }}>{o.type}</td>
                  <td style={{ padding: "16px" }}><StatusBadge status={o.status} /></td>
                  <td style={{ padding: "16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: palette.text, textAlign: "right" }}>₹{o.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
}
