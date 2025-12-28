export type BrandTheme = {
  primary: string;   // hex like #6366F1
  secondary: string; // hex like #22C55E
  font: string;      // CSS font-family name
};

export const FONT_OPTIONS = [
  { key: "inter", name: "Inter" },
  { key: "cairo", name: "Cairo" },
  { key: "tajawal", name: "Tajawal" },
  { key: "poppins", name: "Poppins" },
  { key: "rubik", name: "Rubik" },
] as const;

export const COLOR_PRESETS = [
  { key: "indigo", primary: "#6366F1", secondary: "#22C55E" },
  { key: "sky", primary: "#0284C7", secondary: "#F59E0B" },
  { key: "emerald", primary: "#10B981", secondary: "#6366F1" },
  { key: "rose", primary: "#F43F5E", secondary: "#0EA5E9" },
  { key: "violet", primary: "#8B5CF6", secondary: "#F97316" },
  { key: "teal", primary: "#14B8A6", secondary: "#A855F7" },
] as const;

export const DEFAULT_BRAND: BrandTheme = {
  primary: "#6366F1",
  secondary: "#22C55E",
  font: "Inter",
};

export const BRAND_STORAGE_KEY = "fisal.brand";
