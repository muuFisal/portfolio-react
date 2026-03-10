import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useHomeSkillsShowcaseQuery, useSkillsQuery } from "../../../app/api/resources";
import type { SkillItem } from "../../../app/api/types";
import { getSkillPalette } from "../../../utils/skill-colors";
import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import SectionHeader from "../../ui/SectionHeader";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function useCountUp(target: number, start: boolean, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let raf = 0;
    const startedAt = performance.now();
    const finalValue = clamp(target, 0, 100);

    const tick = (now: number) => {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(finalValue * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, start, target]);

  return value;
}

function SkillBar({ item, delay }: { item: SkillItem; delay: number }) {
  const [start, setStart] = useState(false);
  const value = useCountUp(item.percent, start, 950);
  const palette = getSkillPalette(item);

  const fillStyle: CSSProperties = {
    background: `linear-gradient(90deg, ${palette.from}, ${palette.to})`,
  };

  const badgeStyle: CSSProperties = {
    borderColor: `${palette.ring}55`,
    color: palette.text,
    background: `${palette.ring}14`,
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
          {item.category ? (
            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
              {item.category}
            </div>
          ) : null}
        </div>

        <span
          className="relative inline-flex items-center rounded-full border px-3 py-1 text-xs font-extrabold"
          style={badgeStyle}
        >
          <span className="tabular-nums">{value}%</span>
        </span>
      </div>

      <div className="relative mt-4">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="relative h-full rounded-full"
            style={fillStyle}
            initial={{ width: "0%" }}
            animate={{ width: `${value}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </div>

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
  const showcaseQuery = useHomeSkillsShowcaseQuery();
  const skillsQuery = useSkillsQuery();

  const items = useMemo(() => {
    if (showcaseQuery.data?.items.length) {
      return showcaseQuery.data.items;
    }

    return (skillsQuery.data?.items || []).filter((skill) => skill.featured).slice(0, 12);
  }, [showcaseQuery.data?.items, skillsQuery.data?.items]);

  const columns = useMemo(() => {
    const output = [[], [], []] as SkillItem[][];
    items.forEach((item, index) => {
      output[index % 3].push(item);
    });
    return output;
  }, [items]);

  const chips = useMemo(() => {
    return (skillsQuery.data?.items || [])
      .map((skill) => skill.title)
      .filter(Boolean)
      .slice(0, 18);
  }, [skillsQuery.data?.items]);

  return (
    <section className="relative py-14">
      <Container>
        <SectionHeader
          title={showcaseQuery.data?.title || "Skills Showcase"}
          subtitle={
            showcaseQuery.data?.subtitle ||
            showcaseQuery.data?.description ||
            "Core strengths used repeatedly in production."
          }
        />

        {showcaseQuery.error ? (
          <Card className="mb-5 p-5">
            <div className="font-extrabold">Unable to load skills showcase</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {showcaseQuery.error.message}
            </p>
            <div className="mt-4">
              <Button onClick={showcaseQuery.refetch} variant="secondary">
                Retry
              </Button>
            </div>
          </Card>
        ) : null}

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {(showcaseQuery.loading && !items.length ? [0, 1, 2] : columns).map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {Array.isArray(column) && column.length
                ? column.map((item, index) => (
                    <SkillBar key={item.id} item={item} delay={0.05 * index} />
                  ))
                : showcaseQuery.loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="p-5">
                      <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="mt-3 h-2.5 w-full animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                    </Card>
                  ))
                : null}
            </div>
          ))}
        </div>

        {!showcaseQuery.loading && !items.length && !showcaseQuery.error ? (
          <Card className="mt-5 p-5 text-sm text-slate-600 dark:text-slate-300">
            Skills showcase data is not available yet.
          </Card>
        ) : null}

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                {skillsQuery.data?.summary.total_items
                  ? `${skillsQuery.data.summary.total_items} Skills`
                  : "Tools & Stack"}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {showcaseQuery.data?.content.description ||
                  "Skills and tools I reach for repeatedly in production work."}
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">
              API-backed and language-aware
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip, index) => (
              <motion.span
                key={`${chip}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.35, delay: 0.02 * index }}
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
