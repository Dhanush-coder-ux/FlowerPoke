import { palette } from "../../utils/constants";

export default function StatusBadge({ status }) {
  let bg = "#F5F5F5";
  let color = "#555";

  switch (status.toLowerCase()) {
    case "pending":
    case "available":
      bg = "#FFF4E5";
      color = "#C8621A";
      break;
    case "preparing":
      bg = "#E8F4FD";
      color = "#2B7BBA";
      break;
    case "out for delivery":
    case "active":
      bg = "#E9E5F9";
      color = "#6B44C4";
      break;
    case "delivered":
      bg = "#E3EFE1";
      color = "#2E6A2C";
      break;
    case "cancelled":
    case "offline":
      bg = "#FCE8D5";
      color = "#A0404F";
      break;
    default:
      break;
  }

  return (
    <span
      style={{
        background: bg,
        color: color,
        fontSize: 11,
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: 100,
        fontFamily: "'DM Sans', sans-serif",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {status}
    </span>
  );
}
