import type { Settings } from "../app/settings/context";

export type ProfileData = {
  fullName: string;
  headline: string;
  shortBio: string;
  longBio: string;
  location: string;
  years: string;
  cvUrl: string;
  photoUrl: string;
  availability: string;
  primaryFocus: string[];
};

export function getProfileData(settings: Settings | null): ProfileData {
  const anySettings = settings as any;
  return {
    fullName: anySettings?.full_name || anySettings?.site_name || "Mohamed Fisal",
    headline:
      anySettings?.headline ||
      anySettings?.hero_title ||
      "Senior Backend Engineer • Laravel Architect • React Developer",
    shortBio:
      anySettings?.short_bio ||
      anySettings?.site_desc ||
      "I design and ship scalable business systems with strong backend architecture, reliable integrations, and polished admin experiences.",
    longBio:
      anySettings?.long_bio ||
      "I build products that solve real operational problems — from ERP and CRM platforms to payment systems, wallet flows, webhooks, multilingual dashboards, and modern React frontends. My focus is not just writing code, but designing maintainable systems that teams can safely grow.",
    location: anySettings?.location || anySettings?.address || "Egypt • Remote-friendly",
    years: String(anySettings?.years_experience || anySettings?.years || "+7"),
    cvUrl: anySettings?.cv_url || anySettings?.resume_url || anySettings?.resume || "#",
    photoUrl: anySettings?.profile_image_url || anySettings?.avatar || anySettings?.photo || "",
    availability: anySettings?.availability || "Available for freelance, consulting, and full-time opportunities",
    primaryFocus: anySettings?.primary_focus || [
      "ERP / CRM Architecture",
      "Laravel + Livewire Systems",
      "React + TypeScript Frontends",
      "Payments, Wallets & Webhooks",
    ],
  };
}
