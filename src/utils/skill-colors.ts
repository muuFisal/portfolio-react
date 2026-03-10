import type { SkillItem } from "../app/api/types";

export const SKILL_PALETTE = [
  { from: "#60A5FA", to: "#2563EB", text: "#1D4ED8", ring: "#60A5FA" },
  { from: "#34D399", to: "#059669", text: "#047857", ring: "#34D399" },
  { from: "#A78BFA", to: "#7C3AED", text: "#6D28D9", ring: "#A78BFA" },
  { from: "#FBBF24", to: "#D97706", text: "#B45309", ring: "#FBBF24" },
  { from: "#FB7185", to: "#E11D48", text: "#BE123C", ring: "#FB7185" },
  { from: "#22D3EE", to: "#0891B2", text: "#0E7490", ring: "#22D3EE" },
  { from: "#F472B6", to: "#DB2777", text: "#BE185D", ring: "#F472B6" },
  { from: "#4ADE80", to: "#16A34A", text: "#166534", ring: "#4ADE80" },
  { from: "#F97316", to: "#EA580C", text: "#C2410C", ring: "#F97316" },
] as const;

const EXPLICIT_COLOR_INDEX: Record<string, number> = {
  backend: 0,
  "backend engineering": 0,
  "php laravel": 0,
  integrations: 1,
  "rest apis webhooks": 1,
  dashboards: 2,
  livewire: 2,
  security: 3,
  "roles permissions": 3,
  frontend: 4,
  "react typescript": 4,
  ux: 5,
  inertia: 5,
  ui: 6,
  "tailwind bootstrap": 6,
  locales: 7,
  "i18n rtl": 7,
  systems: 8,
  "wallet systems": 8,
  payments: 3,
  "payment gateways": 3,
  architecture: 2,
  observability: 7,
  "audit logs": 7,
};

function normalizeValue(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
    .trim();
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getSkillPaletteIndex(skill: Pick<SkillItem, "title" | "subtitle" | "category">) {
  const candidates = [skill.title, skill.subtitle, skill.category]
    .map(normalizeValue)
    .filter(Boolean);

  for (const candidate of candidates) {
    if (candidate in EXPLICIT_COLOR_INDEX) {
      return EXPLICIT_COLOR_INDEX[candidate];
    }
  }

  return hashString(candidates.join("|") || skill.title || "skill") % SKILL_PALETTE.length;
}

export function getSkillPalette(skill: Pick<SkillItem, "title" | "subtitle" | "category">) {
  return SKILL_PALETTE[getSkillPaletteIndex(skill)];
}
