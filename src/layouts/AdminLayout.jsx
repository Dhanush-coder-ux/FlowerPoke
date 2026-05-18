import { Outlet, NavLink } from "react-router-dom";
import { palette } from "../utils/constants";
import { motion } from "framer-motion";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: "📊" },
  { path: "/admin/orders", label: "Orders", icon: "🛍️" },
  { path: "/admin/slots", label: "Slots & Pricing", icon: "⚙️" },
  { path: "/admin/riders", label: "Riders", icon: "🛵" },
];

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: palette.cream }}>
      {/* Sidebar */}
      <div
        style={{
          width: 260,
          background: "#2D1F28",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          boxShadow: "4px 0 24px rgba(45,31,40,0.15)",
          zIndex: 100,
        }}
      >
        <div style={{ padding: "32px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 24, userSelect: "none" }}>🌸</span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              Floradelic Admin
            </span>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5, marginLeft: 36 }}>
            Command Center
          </div>
        </div>

        <div style={{ padding: "24px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                borderRadius: 12,
                color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14.5,
                fontWeight: isActive ? 600 : 500,
                transition: "all 0.2s ease",
              })}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* User profile mock */}
        <div style={{ padding: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${palette.blushMid}, ${palette.blushDeep || "#D0788A"})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              A
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600 }}>Admin User</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Store Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: 260, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            height: 72,
            background: "#fff",
            borderBottom: "1px solid rgba(45,31,40,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 90,
          }}
        >
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: palette.textMuted }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ background: palette.cream, border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>🔔</motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ background: palette.cream, border: "none", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>⚙️</motion.button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "32px", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
