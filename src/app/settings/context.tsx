import React from "react";
import { useNavigationQuery, useSettingsQuery } from "../api/resources";
import type {
  ApiError,
  NavigationItem,
  PortfolioSettings,
} from "../api/types";

type SettingsContextValue = {
  settings: PortfolioSettings | null;
  navigation: NavigationItem[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
};

export const SettingsContext = React.createContext<SettingsContextValue | null>(null);

function setMeta(name: string, content?: string, attribute: "name" | "property" = "name") {
  if (!content) {
    return;
  }

  const selector =
    attribute === "name" ? `meta[name="${name}"]` : `meta[property="${name}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function applySettingsToHead(settings: PortfolioSettings | null) {
  if (!settings) {
    return;
  }

  setMeta("og:site_name", settings.site_name || undefined, "property");

  if (settings.branding.favicon_url) {
    let icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.href = settings.branding.favicon_url;
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const settingsQuery = useSettingsQuery({ trackLoading: true });
  const navigationQuery = useNavigationQuery({ trackLoading: true });

  React.useEffect(() => {
    applySettingsToHead(settingsQuery.data);
  }, [settingsQuery.data]);

  const value = React.useMemo<SettingsContextValue>(
    () => ({
      settings: settingsQuery.data,
      navigation: navigationQuery.data?.items || [],
      loading: settingsQuery.loading || navigationQuery.loading,
      error: settingsQuery.error || navigationQuery.error,
      refetch: () => {
        settingsQuery.refetch();
        navigationQuery.refetch();
      },
    }),
    [
      navigationQuery.data?.items,
      navigationQuery.error,
      navigationQuery.loading,
      navigationQuery.refetch,
      settingsQuery.data,
      settingsQuery.error,
      settingsQuery.loading,
      settingsQuery.refetch,
    ]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return context;
}
