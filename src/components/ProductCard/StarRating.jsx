import { palette } from "../../utils/constants";

export default function StarRating({ rating }) {
  const roundedRating = Math.floor(rating || 5);
  return (
    <span style={{ color: palette.gold, fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(roundedRating)}{"☆".repeat(5 - roundedRating)}
    </span>
  );
}
