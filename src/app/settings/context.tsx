import React from "react";
import { useApiQuery, clearApiCache } from "../api/hooks";

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


function mapSettingsResponse(raw: any): Settings {
  const item = Array.isArray(raw) ? raw[0] : raw;
  if (!item) return {};
  return {
    site_name: item.name ?? item.site_name ?? "",
    site_title: item.title ?? item.site_title ?? "",
    site_desc: item.desc ?? item.description ?? item.site_desc ?? "",
    meta_keys: item.metaKey ?? item.meta_keys ?? "",
    meta_desc: item.metaDesc ?? item.meta_desc ?? "",
    logo_url: item.logo ?? item.logo_url ?? "",
    favicon_url: item.favicon ?? item.favicon_url ?? "",
    email: item.email ?? "",
    phone: item.phone ?? "",
    whatsapp: item.whatsapp ?? "",
    facebook: item.facebook ?? "",
    instagram: item.instagram ?? "",
    youtube: item.youtube ?? "",
    tiktok: item.tiktok ?? "",
    linkedin: item.linkedin ?? "",
    // backend uses xUrl
    x: item.xUrl ?? item.x ?? item.twitter ?? "",
    address: item.address ?? "",
    support: item.support ?? "",
    promotion: item.promotion ?? "",
    footer_text: item.copyright ?? item.footer_text ?? "",
  };
}

function applyHeadFromSettings(s: Settings) {
  if (s.site_title) document.title = s.site_title;

  const desc = document.querySelector('meta[name="description"]');
  if (desc && s.meta_desc) desc.setAttribute("content", s.meta_desc);

  const keywords = document.querySelector('meta[name="keywords"]');
  if (keywords && s.meta_keys) keywords.setAttribute("content", s.meta_keys);

  if (s.favicon_url) {
    const existing = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (existing) existing.href = s.favicon_url;
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, refetch } = useApiQuery<any>("settings", "/settings");

  React.useEffect(() => {
    if (data) applyHeadFromSettings(mapSettingsResponse(data));
  }, [data]);

  return (
    <SettingsContext.Provider value={{ settings: data ? mapSettingsResponse(data) : null, loading, refetch }}>
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
  clearApiCache("settings");
}
