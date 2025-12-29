import { useApiQuery, useApiQuerySelect } from "./hooks";

export type Project = {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  cover_image_url?: string;
  gallery?: string[];
  tags?: string[];
  featured?: boolean;
  links?: {
    web?: string;
    google_play?: string;
    app_store?: string;
  };
  stack?: string[];
};

export type Experience = {
  id: number;
  title: string;
  company?: string;
  location?: string;
  start_date?: string;
  end_date?: string | null;
  is_current?: boolean;
  description?: string;
  tags?: string[];
};

export type EventItem = {
  id: number;
  title: string;
  date?: string;
  location?: string;
  description?: string;
  cover_image_url?: string;
  link?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  badge?: string;
  quote: string;
};

export type Skill = {
  id: number;
  title: string;
  subtitle?: string;
  percent: number;
  sort_order?: number;
};

export type Achievement = {
  id: number;
  title: string;
  description?: string;
  value?: number;
  unit?: string;
  icon?: string;
};

export function useProjects() {
  return useApiQuery<Project[]>("projects", "/projects");
}

export function useProject(slug: string) {
  const safe = String(slug);
  return useApiQuery<Project>(`project:${safe}`, `/projects/${encodeURIComponent(safe)}`);
}

export function useExperiences() {
  return useApiQuerySelect<any, Experience[]>("experiences", "/experiences", (raw) => {
    const arr = (raw as any[]) || [];
    return arr.map((e: any) => {
      const highlights = Array.isArray(e.highlights) ? e.highlights : [];
      const lang = (typeof window !== "undefined" && document?.documentElement?.dir === "rtl") ? "ar" : "en";
      const desc = highlights
        .map((h: any) => (typeof h === "string" ? h : (h?.[lang] ?? h?.en ?? h?.ar ?? "")))
        .filter(Boolean)
        .join(" • ");
      return {
        id: e.id,
        title: e.role ?? e.title ?? "",
        company: e.company ?? "",
        location: e.location ?? "",
        start_date: e.start_date,
        end_date: e.end_date,
        is_current: e.end_date == null,
        description: e.description ?? desc,
        tags: e.tags ?? [],
      } as Experience;
    });
  });
}

export function useEvents() {
  return useApiQuery<EventItem[]>("events", "/events");
}

export function useTestimonials() {
  return useApiQuerySelect<any, Testimonial[]>("testimonials", "/testimonials", (raw) => {
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((t: any) => ({
      id: t.id,
      name: t.name ?? "",
      badge: t.badge ?? "",
      quote: t.quote ?? t.content ?? "",
    }));
  });
}

export function useSkills() {
  return useApiQuerySelect<any, Skill[]>("skills", "/skills", (raw) => {
    const arr = Array.isArray(raw) ? raw : [];
    return arr
      .map((s: any) => ({
        id: s.id,
        title: s.title ?? "",
        subtitle: s.subtitle ?? "",
        percent: Number(s.percent ?? s.level ?? 0),
        sort_order: s.sort_order,
      }))
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  });
}

export function useAchievements() {
  return useApiQuerySelect<any, Achievement[]>("achievements", "/achievements", (raw) => {
    const arr = (raw as any[]) || [];
    return arr.map((a: any) => ({
      id: a.id,
      title: a.title ?? "",
      description: a.description ?? "",
      value: a.value,
      unit: a.unit,
      icon: a.icon,
    }));
  });
}
