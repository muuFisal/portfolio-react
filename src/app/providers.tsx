import React from "react";
import "../i18n";
import { useTranslation } from "react-i18next";
import { applyDirection } from "../utils/direction";
import { storage } from "../utils/storage";
import { BRAND_STORAGE_KEY, DEFAULT_BRAND, type BrandTheme } from "../theme/theme";

type Theme = "light" | "dark";

type AppCtx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  brand: BrandTheme;
  setBrand: (b: BrandTheme) => void;
  setPrimary: (hex: string) => void;
  setSecondary: (hex: string) => void;
  setFont: (font: string) => void;
  resetBrand: () => void;
};

export const AppContext = React.createContext<AppCtx | null>(null);

function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `${r} ${g} ${b}`;
}

function applyBrandVars(brand: BrandTheme) {
  const root = document.documentElement;
  root.style.setProperty("--primary", hexToRgbTriplet(brand.primary));
  root.style.setProperty("--secondary", hexToRgbTriplet(brand.secondary));
  root.style.setProperty("--font-sans", `"${brand.font}"`);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = storage.getTheme() as Theme | null;
    return saved ?? "dark";
  });

  const [brand, setBrand] = React.useState<BrandTheme>(() => {
    const saved = storage.getJson<BrandTheme>(BRAND_STORAGE_KEY);
    return saved ?? DEFAULT_BRAND;
  });

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    storage.setTheme(theme);
  }, [theme]);

  React.useEffect(() => {
    applyDirection(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    applyDirection(i18n.language);
  }, [i18n.language]);

  React.useEffect(() => {
    applyBrandVars(brand);
    storage.set(BRAND_STORAGE_KEY, brand);
  }, [brand]);

  const setPrimary = (hex: string) => setBrand((b) => ({ ...b, primary: hex }));
  const setSecondary = (hex: string) => setBrand((b) => ({ ...b, secondary: hex }));
  const setFont = (font: string) => setBrand((b) => ({ ...b, font }));
  const resetBrand = () => setBrand(DEFAULT_BRAND);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        brand,
        setBrand,
        setPrimary,
        setSecondary,
        setFont,
        resetBrand,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
