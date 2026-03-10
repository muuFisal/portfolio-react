import type { NavigationItem } from "../app/api/types";

const DATE_LOCALE = {
  ar: "ar-EG",
  en: "en-US",
} as const;

export function cleanHost(url?: string | null) {
  if (!url) {
    return "";
  }
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function isExternalHref(href?: string | null) {
  return Boolean(href && /^(https?:)?\/\//.test(href));
}

export function toAbsoluteUrl(value?: string | null) {
  if (!value) {
    return "";
  }

  try {
    return new URL(value, window.location.origin).toString();
  } catch {
    return value;
  }
}

export function formatDate(
  value: string | null | undefined,
  language: string,
  options: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" }
) {
  if (!value) {
    return "";
  }

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const locale = language.startsWith("ar") ? DATE_LOCALE.ar : DATE_LOCALE.en;
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatDateRange(
  start: string | null | undefined,
  end: string | null | undefined,
  isCurrent: boolean,
  language: string
) {
  const startLabel = formatDate(start, language);
  const endLabel = isCurrent
    ? language.startsWith("ar")
      ? "حتى الآن"
      : "Present"
    : formatDate(end, language);

  return [startLabel, endLabel].filter(Boolean).join(" • ");
}

export function formatCount(value: number | null | undefined) {
  if (value == null) {
    return "—";
  }
  return value.toLocaleString();
}

export function mapHeroStatLabel(label: string, fallback?: string) {
  const normalized = label.toLowerCase();
  const dictionary: Record<string, string> = {
    years_experience: "Years Experience",
    projects_delivered: "Projects Delivered",
    clients_count: "Clients",
  };

  return dictionary[normalized] || fallback || label.replace(/_/g, " ");
}

export function buildNavigationItems(navigation: NavigationItem[]) {
  return navigation.filter((item) => Boolean(item.href && item.label));
}
