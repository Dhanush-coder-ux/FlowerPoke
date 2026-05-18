import { colors } from "../theme/colors";
import { shadows as themeShadows } from "../theme/shadows";

export const palette = colors;
export const shadows = themeShadows;

export const badgeColors = {
  "Same-Day": { bg: "#FAF8FF", text: "#6B4D91", border: "rgba(107,77,145,0.15)" },
  "2-Hour": { bg: "#F2F6F1", text: "#4E6B4A", border: "rgba(78,107,74,0.15)" },
  "Midnight": { bg: "#F6F2FC", text: "#8A6EB8", border: "rgba(138,110,184,0.15)" },
};

export const tagColors = {
  "Bestseller": { bg: "#E1D5F0", text: "#523675" },
  "New": { bg: "#E5F0E4", text: "#2E502B" },
  "Premium": { bg: "#FAF2E6", text: "#7A5E2B" },
  "Popular": { bg: "#FAF8FF", text: "#6B4D91" },
  "Sale": { bg: "#FCF2E8", text: "#8A541B" },
  "Limited": { bg: "#F6F2FC", text: "#4E366B" },
  "Trending": { bg: "#E1D5F0", text: "#523675" },
  "Seasonal": { bg: "#E5F0E4", text: "#2E502B" },
};

export const categoryColors = {
  "Birthday": {
    from: "#FAF8FF",
    to: "#FAF6F0",
    accent: "#B19CD9",
  },
  "Anniversary": {
    from: "#EDE4F6",
    to: "#F6F2FC",
    accent: "#B19CD9",
  },
  "Valentine's": {
    from: "#FAF8FF",
    to: "#F6F2FC",
    accent: "#C6B2E0",
  },
  "Mother's Day": {
    from: "#FAF6F0",
    to: "#FAF8FF",
    accent: "#8A6EB8",
  },
  "Wedding": {
    from: "#FAF8FF",
    to: "#FAFAFF",
    accent: "#6B4D91",
  },
  "Diwali": {
    from: "#FAF6F0",
    to: "#FAF2E6",
    accent: "#C9A96E",
  },
  "Christmas": {
    from: "#F2F6F1",
    to: "#FAFAFF",
    accent: "#4E6B4A",
  },
  "Rakhi": {
    from: "#FAF8FF",
    to: "#FAF6F0",
    accent: "#B19CD9",
  },
};
