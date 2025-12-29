import SectionHeader from "../../ui/SectionHeader";
import Container from "../../layout/Container";
import SectionFX from "../../ui/SectionFX";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useSkills } from "../../../app/api/resources";

type SkillItem = {
  title: string;
  percent: number;
  subtitle?: string;
  paletteIndex?: number;
};


const SKILL_PALETTE = [
  {
    "from": "#60A5FA",
    "to": "#2563EB",
    "text": "#1D4ED8",
    "ring": "#60A5FA"
  },
  {
    "from": "#34D399",
    "to": "#059669",
    "text": "#047857",
    "ring": "#34D399"
  },
  {
    "from": "#A78BFA",
    "to": "#7C3AED",
    "text": "#6D28D9",
    "ring": "#A78BFA"
  },
  {
    "from": "#FBBF24",
    "to": "#D97706",
    "text": "#B45309",
    "ring": "#FBBF24"
  },
  {
    "from": "#FB7185",
    "to": "#E11D48",
    "text": "#BE123C",
    "ring": "#FB7185"
  },
  {
    "from": "#22D3EE",
    "to": "#0891B2",
    "text": "#0E7490",
    "ring": "#22D3EE"
  },
  {
    "from": "#F472B6",
    "to": "#DB2777",
    "text": "#BE185D",
    "ring": "#F472B6"
  },
  {
    "from": "#4ADE80",
    "to": "#16A34A",
    "text": "#166534",
    "ring": "#4ADE80"
  },
  {
    "from": "#F97316",
    "to": "#EA580C",
    "text": "#C2410C",
    "ring": "#F97316"
  }
] as const;
const COLORS = ["sky", "emerald", "violet", "amber", "rose", "teal", "indigo", "lime", "fuchsia"];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function useCountUp(target: number, start: boolean, duration = 900) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf = 0;
    const t0 = performance.now();
    const to = clamp(target, 0, 100);

    const tick = (t: number) => {
      const p = clamp((t - t0) / duration, 0, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return v;
}

function Bar({ item, delay }: { item: SkillItem; delay: number }) {
  const [start, setStart] = useState(false);
  const value = useCountUp(item.percent, start, 950);

  const p = SKILL_PALETTE[item.paletteIndex ?? 0] ?? SKILL_PALETTE[0];

  const fillStyle: CSSProperties = {
    background: `linear-gradient(90deg, ${p.from}, ${p.to})`,
  };

  const glowStyle: CSSProperties = {
    background: `linear-gradient(90deg, ${p.from}, ${p.to})`,
  };

  const badgeStyle: CSSProperties = {
    borderColor: p.ring + "55",
    color: p.text,
    background: p.ring + "14",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.5, delay }}
      onViewportEnter={() => setStart(true)}
      className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white">
            {item.title}
          </div>
          {item.subtitle ? (
            <div className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-300">
              {item.subtitle}
            </div>
          ) : null}
        </div>

        <span
          className={[
            "relative inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold",
            "bg-white/80 dark:bg-slate-950/40",
            badgeStyle,
          ].join(" ")}
        >
          <span className="tabular-nums">{value}%</span>
        </span>
      </div>

      <div className="mt-4 relative">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="relative h-full rounded-full"
            style={fillStyle}
            initial={{ width: "0%" }}
            animate={{ width: `${value}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <div className="absolute inset-0 opacity-70 blur-xl"
              style={glowStyle} />
          </motion.div>
        </div>

        {/* moving shine */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-0 w-24 rounded-full bg-white/40 blur-md dark:bg-white/10"
          initial={{ x: "-40%" }}
          animate={{ x: "140%" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsShowcase() {
  const { t } = useTranslation();

  const { data: apiSkills } = useSkills();

  const groups = useMemo(() => {
    // fallback (in case API is empty)
    const fallback: SkillItem[] = [
      { title: t("skills.backend.s1t"), percent: 95, subtitle: t("skills.backend.s1d") },
      { title: t("skills.frontend.s1t"), percent: 85, subtitle: t("skills.frontend.s1d") },
      { title: t("skills.systems.s1t"), percent: 90, subtitle: t("skills.systems.s1d") },
      { title: t("skills.backend.s2t"), percent: 92, subtitle: t("skills.backend.s2d") },
      { title: t("skills.frontend.s2t"), percent: 80, subtitle: t("skills.frontend.s2d") },
      { title: t("skills.systems.s2t"), percent: 88, subtitle: t("skills.systems.s2d") },
      { title: t("skills.backend.s3t"), percent: 90, subtitle: t("skills.backend.s3d") },
      { title: t("skills.frontend.s3t"), percent: 88, subtitle: t("skills.frontend.s3d") },
      { title: t("skills.systems.s3t"), percent: 87, subtitle: t("skills.systems.s3d") },
      { title: t("skills.backend.s4t"), percent: 88, subtitle: t("skills.backend.s4d") },
      { title: t("skills.frontend.s4t"), percent: 90, subtitle: t("skills.frontend.s4d") },
      { title: t("skills.systems.s4t"), percent: 86, subtitle: t("skills.systems.s4d") },
    ];

    const base: SkillItem[] = (apiSkills?.length ? apiSkills : fallback).map((s, idx) => ({
      title: s.title,
      subtitle: s.subtitle,
      percent: s.percent,
      paletteIndex: idx % SKILL_PALETTE.length,
    }));

    const col1: SkillItem[] = [];
    const col2: SkillItem[] = [];
    const col3: SkillItem[] = [];

    base.forEach((it, idx) => {
      if (idx % 3 === 0) col1.push(it);
      else if (idx % 3 === 1) col2.push(it);
      else col3.push(it);
    });

    return { col1, col2, col3 };
  }, [t, apiSkills]);

  const chips = useMemo(() => {
    const fromApi = (apiSkills || [])
      .map((s) => s.title)
      .filter((x) => !!x && String(x).trim() !== "")
      .slice(0, 20);

    return fromApi.length
      ? fromApi
      : [
          "Spatie i18n",
          "Meta API",
          "OPay",
          "Payments",
          "Webhooks",
          "Queues",
          "Redis",
          "MySQL",
          "Tailwind",
          "TypeScript",
          "React",
          "Livewire",
          "Laravel",
          "IIS / Nginx",
          "Docker (Basics)",
          "Audit Logs",
        ];
  }, [apiSkills]);

  return (
    <section className="relative py-14">
      <Container>
        <SectionHeader title={t("skills.title")} subtitle={t("skills.subtitle")} />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <div className="space-y-4">
            {groups.col1.map((it, idx) => (
              <Bar key={`${it.title}-${idx}`} item={it} delay={0.05 * idx} />
            ))}
          </div>

          <div className="space-y-4">
            {groups.col2.map((it, idx) => (
              <Bar key={`${it.title}-${idx}`} item={it} delay={0.05 * idx} />
            ))}
          </div>

          <div className="space-y-4">
            {groups.col3.map((it, idx) => (
              <Bar key={`${it.title}-${idx}`} item={it} delay={0.05 * idx} />
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                {t("skills.tools.title")}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {t("skills.tools.subtitle")}
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">
              {t("skills.tools.hint")}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.35, delay: 0.02 * i }}
                whileHover={{ y: -2 }}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}