import { useTranslation } from "react-i18next";
import { projects as localProjects } from "../../data/projects";

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
  highlights?: string[];
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
  const { t } = useTranslation();

  const data: Project[] = localProjects.map((p) => ({
    id: Number(p.id.length),
    slug: p.id,
    title: t(p.titleKey),
    summary: t(p.descKey),
    description: t(p.descKey),
    cover_image_url: p.image,
    tags: [p.category],
    featured: p.featured,
    stack: p.stack,
    links: {
      web: p.links?.web,
      google_play: p.links?.googlePlay,
      app_store: p.links?.appStore,
    },
    highlights: p.highlightsKey.map(h => t(h)),
  }));

  return { data, loading: false, error: null, refetch: () => { } };
}

export function useProject(slug: string) {
  const { data } = useProjects();
  const project = data.find((p) => p.slug === slug) || null;
  return { data: project, loading: false, error: null, refetch: () => { } };
}

export function useExperiences() {
  const { t } = useTranslation();

  const data: Experience[] = [
    {
      id: 1,
      title: t("experience.roles.sr.title", "Senior Backend Engineer"),
      company: "Freelance & Consulting",
      location: t("experience.roles.sr.location", "Remote"),
      start_date: "2020",
      end_date: null,
      is_current: true,
      description: t("experience.roles.sr.desc", "Architected and delivered scalable ERP systems, Wallet payment gateways, and multilingual platforms. Specialized in Laravel, React, and seamless third-party integrations."),
      tags: ["Laravel", "React", "Architecture", "Payments"],
    },
    {
      id: 2,
      title: t("experience.roles.mid.title", "Full-Stack Developer"),
      company: "Various Tech Agencies",
      location: "MENA Region",
      start_date: "2017",
      end_date: "2020",
      is_current: false,
      description: t("experience.roles.mid.desc", "Developed RESTful APIs, modern dynamic user interfaces, and custom dashboards ensuring robust data pipelines and fast deployment."),
      tags: ["PHP", "Vue.js", "MySQL", "APIs"],
    }
  ];

  return { data, loading: false, error: null, refetch: () => { } };
}

export function useEvents() {
  const { t } = useTranslation();

  const data: EventItem[] = [
    {
      id: 1,
      title: t("events.items.e1.title", "ERP Manufacturing modules delivery"),
      description: t("events.items.e1.desc", "Completed core manufacturing modules with translations, logs, and advanced data tables."),
      date: "2024",
    },
    {
      id: 2,
      title: t("events.items.e2.title", "Wallet payments + OPay integration"),
      description: t("events.items.e2.desc", "Delivered end-to-end topup flow with webhook validation and unified callback view."),
      date: "2023",
    },
    {
      id: 3,
      title: t("events.items.e3.title", "Market tickers engine shipped"),
      description: t("events.items.e3.desc", "Built live-ish market tickers with fallback logic and ensureFresh updates."),
      date: "2022",
    }
  ];

  return { data, loading: false, error: null, refetch: () => { } };
}

export function useTestimonials() {
  const { t } = useTranslation();

  const data: Testimonial[] = [
    {
      id: 1,
      name: t("testimonials.items.t1.name", "Project Manager"),
      badge: t("testimonials.items.t1.role", "Client"),
      quote: t("testimonials.items.t1.quote", "Delivers fast with strong architecture and clean code."),
    },
    {
      id: 2,
      name: t("testimonials.items.t2.name", "Team Lead"),
      badge: t("testimonials.items.t2.role", "Tech"),
      quote: t("testimonials.items.t2.quote", "Great at integrations, webhooks, and edge cases."),
    },
    {
      id: 3,
      name: t("testimonials.items.t3.name", "Founder"),
      badge: t("testimonials.items.t3.role", "Startup"),
      quote: t("testimonials.items.t3.quote", "Reliable execution, clear communication, and real business impact."),
    }
  ];

  return { data, loading: false, error: null, refetch: () => { } };
}

export function useSkills() {
  const data: Skill[] = [];
  return { data, loading: false, error: null, refetch: () => { } };
}

export function useAchievements() {
  const data: Achievement[] = [];
  return { data, loading: false, error: null, refetch: () => { } };
}
