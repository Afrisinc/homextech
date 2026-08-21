export const BRAND = "#8cc63f";
export const BRAND_BRIGHT = "#b6e86a";
export const SIGNAL = "#2aa3e0";
export const SIGNAL_BRIGHT = "#7fd0f5";
export const METAL = "#33424f";
export const METAL_DARK = "#1e2a36";
export const INK = "#dbe6f2";

export const accentColor = (accent: "brand" | "signal") =>
  accent === "brand" ? BRAND : SIGNAL;

export const accentBright = (accent: "brand" | "signal") =>
  accent === "brand" ? BRAND_BRIGHT : SIGNAL_BRIGHT;
