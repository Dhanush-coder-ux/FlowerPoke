import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AppProvider, AppContext } from "./context/AppContext";
import { AdminProvider } from "./context/AdminContext";
import AppRoutes from "./routes/AppRoutes";

function MainApp() {
  const { toast } = useContext(AppContext);

  return (
    <>
      <AppRoutes />
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            background: "#3D2B35",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 30,
            zIndex: 300,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 8px 32px rgba(61,43,53,0.2)",
            animation: "toastReveal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppProvider>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </AppProvider>
    </AdminProvider>
  );
}
