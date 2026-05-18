import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children, maxWidth = 680 }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(61,43,53,0.4)",
        backdropFilter: "blur(8px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          maxWidth: maxWidth,
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(61,43,53,0.22)",
          position: "relative",
          animation: "modalFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <style>{`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.92) translateY(12px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
        {children}
      </div>
    </div>
  );
}
