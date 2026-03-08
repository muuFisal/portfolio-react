import React from "react";
import { useTranslation } from "react-i18next";

export type Settings = {
  site_name?: string;
  site_title?: string;
  site_desc?: string;
  meta_keys?: string;
  meta_desc?: string;
  logo_url?: string;
  favicon_url?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  behance?: string;
  x?: string;
  youtube?: string;
  tiktok?: string;
  footer_text?: string;
  address?: string;
  support?: string;
  promotion?: string;
  logo_white?: string;
  profile_image_url?: string;
  cv_url?: string;
  resume_url?: string;
  headline?: string;
  short_bio?: string;
  long_bio?: string;
  years_experience?: number | string;
  location?: string;
  availability?: string;
  nav_links?: {
    label: string;
    url: string;
  }[];
};

type Ctx = {
  settings: Settings | null;
  loading: boolean;
  refetch: () => void;
};

export const SettingsContext = React.createContext<Ctx | null>(null);

function applyHeadFromSettings(s: Settings) {
  if (s.site_title) document.title = s.site_title;

  const desc = document.querySelector('meta[name="description"]');
  if (desc && s.meta_desc) desc.setAttribute("content", s.meta_desc);

  const keywords = document.querySelector('meta[name="keywords"]');
  if (keywords && s.meta_keys) keywords.setAttribute("content", s.meta_keys);

  if (s.favicon_url) {
    const existing = document.querySelector(
      'link[rel="icon"]'
    ) as HTMLLinkElement | null;
    if (existing) existing.href = s.favicon_url;
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  const settings: Settings = React.useMemo(() => ({
    site_name: "Mohamed Fisal",
    site_title: "Mohamed Fisal — Senior Backend Engineer",
    site_desc: t("home.hero.desc", "I build production-grade platforms using Laravel, Livewire, and React. Specialized in ERP/CRM modules, payments, wallets, webhooks, and multilingual dashboards."),
    meta_keys: "Laravel, React, Backend, Engineer, Architect, Freelance",
    meta_desc: t("home.hero.desc"),
    logo_url: "",
    favicon_url: "/vite.svg", // Add real favicon
    email: "contact@mohamed-fisal.com",
    phone: "+201000000000",
    whatsapp: "+201000000000",
    linkedin: "https://linkedin.com/in/mohamed-fisal",
    github: "https://github.com/muuFisal",
    footer_text: t("footer.rights", "All rights reserved."),
    profile_image_url: "/avatar.jpg", // Needs an actual path
    cv_url: "/resume.pdf",
    headline: t("home.hero.title", "Mohamed Fisal — Build systems that scale."),
    short_bio: t("home.hero.desc"),
    years_experience: 7,
    location: "Remote",
    availability: "Available for freelance and consulting",
  }), [t]);

  React.useEffect(() => {
    applyHeadFromSettings(settings);
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading: false,
        refetch: () => { },
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}

export function refreshSettings() {
  // Static state needs no refresh
}
