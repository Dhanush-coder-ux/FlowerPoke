import { palette } from "../../utils/constants";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search for beautiful flowers...",
}) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
      {/* Search icon */}
      <span
        style={{
          position: "absolute",
          left: 18,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 15,
          userSelect: "none",
          pointerEvents: "none",
          opacity: 0.5,
        }}
      >
        🔍
      </span>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "13px 20px 13px 46px",
          borderRadius: 100,
          border: "1.5px solid rgba(45,31,40,0.12)",
          background: palette.white,
          color: palette.text,
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.22s ease, box-shadow 0.22s ease",
          fontWeight: 400,
          letterSpacing: 0.1,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = palette.blushMid;
          e.target.style.boxShadow = "0 0 0 4px rgba(232, 160, 174, 0.18)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(45,31,40,0.12)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
