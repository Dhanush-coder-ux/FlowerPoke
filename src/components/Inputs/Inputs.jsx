import { palette } from "../../utils/constants";

export function TextInput({ label, value, onChange, placeholder, style, type = "text", ...props }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && (
        <label
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11.5,
            fontWeight: 600,
            color: palette.textMuted,
            display: "block",
            marginBottom: 7,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "13px 16px",
          borderRadius: 14,
          border: "1.5px solid rgba(45,31,40,0.13)",
          background: palette.cream,
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          color: palette.text,
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.22s ease, box-shadow 0.22s ease",
          letterSpacing: 0.1,
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = palette.blushMid;
          e.target.style.boxShadow = "0 0 0 4px rgba(232, 160, 174, 0.18)";
          e.target.style.background = "#fff";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(45,31,40,0.13)";
          e.target.style.boxShadow = "none";
          e.target.style.background = palette.cream;
        }}
        {...props}
      />
    </div>
  );
}
