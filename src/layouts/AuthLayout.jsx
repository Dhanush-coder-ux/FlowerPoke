import { Outlet } from "react-router-dom";
import { palette } from "../utils/constants";

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${palette.blushLight}, ${palette.lavenderLight})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Outlet />
    </div>
  );
}
