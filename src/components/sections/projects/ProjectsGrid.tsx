import React from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import MotionSection from "../../ui/MotionSection";
import { useProjects, useProject, type Project } from "../../../app/api/resources";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type Tag = string;

function pickTags(list: Project[] | null): Tag[] {
  if (!list?.length) return [];
  const s = new Set<string>();
  for (const p of list) {
    for (const t of p.tags || []) {
      const v = String(t).trim();
      if (v) s.add(v);
    }
  }
  return Array.from(s).slice(0, 8);
}

export default function ProjectsGrid() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useProjects();
  const projects = data || [];

  const tags = React.useMemo(() => pickTags(data || null), [data]);
  const [tag, setTag] = React.useState<Tag | "All">("All");
  const [q, setQ] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [slug, setSlug] = React.useState<string | null>(null);

  const filtered = projects.filter((p) => {
    const okTag = tag === "All" ? true : (p.tags || []).includes(tag);
    const query = q.trim().toLowerCase();
    const okQ =
      !query ||
      (p.title || "").toLowerCase().includes(query) ||
      (p.summary || "").toLowerCase().includes(query) ||
      (p.tags || []).join(" ").toLowerCase().includes(query) ||
      (p.stack || []).join(" ").toLowerCase().includes(query);

    return okTag && okQ;
  });

  const openProject = (p: Project) => {
    setSlug(p.slug);
    setOpen(true);
  };

  return (
    <MotionSection className="py-10">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTag("All")}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition
                ${
                  tag === "All"
                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50"
                }`}
            >
              {t("projects.filters.all")}
            </button>

            {tags.map((c) => (
              <button
                key={c}
                onClick={() => setTag(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition
                ${
                  tag === c
                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("projects.filters.search")}
              className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-semibold outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
            />
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-400">
              ⌘K
            </span>
          </div>
        </div>

        {error ? (
          <Card className="p-5">
            <div className="font-extrabold">{t("common.error")}</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {error.message}
            </p>
            <div className="mt-4">
              <Button onClick={refetch} variant="secondary">
                {t("common.retry")}
              </Button>
            </div>
          </Card>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="overflow-hidden p-0">
                  <div className="h-44 w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
                  <div className="p-5">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </Card>
              ))
            : filtered.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45 }}
                >
                  <Card className="group overflow-hidden p-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                      <img
                        src={p.cover_image_url || "/projects/ecommerce-react.svg"}
                        alt={p.title}
                        className="h-44 w-full object-cover"
                        loading="lazy"
                      />

                      <div className="absolute start-3 top-3 flex items-center gap-2">
                        {p.featured ? <Badge>{t("projects.featured")}</Badge> : null}
                        {p.tags?.length ? <Badge>{p.tags[0]}</Badge> : null}
                      </div>

                      <div className="absolute end-3 top-3 flex items-center gap-2">
                        <LinkPills links={p.links} />
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="text-lg font-extrabold">{p.title}</div>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                        {p.summary || ""}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(p.stack || []).slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <Button onClick={() => openProject(p)} variant="secondary" className="px-4 py-2">
                          {t("projects.view")}
                        </Button>
                        <span className="text-xs font-bold text-slate-400">{t("projects.tap")}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
        </div>

        <Modal open={open} onClose={() => setOpen(false)} title={""}>
          {slug ? <ProjectModal slug={slug} /> : null}
        </Modal>
      </div>
    </MotionSection>
  );
}

function LinkPills({ links }: { links?: Project["links"] }) {
  if (!links) return null;

  const items = [
    links.web ? { k: "web", href: links.web, label: "Web", icon: "🌐" } : null,
    links.google_play ? { k: "gp", href: links.google_play, label: "Google Play", icon: "▶" } : null,
    links.app_store ? { k: "as", href: links.app_store, label: "App Store", icon: "" } : null,
  ].filter(Boolean) as { k: string; href: string; label: string; icon: string }[];

  if (!items.length) return null;

  return (
    <>
      {items.map((it) => (
        <a
          key={it.k}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] font-extrabold text-white backdrop-blur hover:bg-black/40"
          title={it.label}
        >
          <span className="text-[12px]">{it.icon}</span>
          <span className="hidden sm:inline">{it.label}</span>
        </a>
      ))}
    </>
  );
}

function LinkButton({ links }: { links?: Project["links"] }) {
  if (!links) return null;

  const items = [
    links.web ? { k: "web", href: links.web, label: "Web", icon: "🌐" } : null,
    links.google_play ? { k: "gp", href: links.google_play, label: "Google Play", icon: "▶" } : null,
    links.app_store ? { k: "as", href: links.app_store, label: "App Store", icon: "" } : null,
  ].filter(Boolean) as { k: string; href: string; label: string; icon: string }[];

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <a key={it.k} href={it.href} target="_blank" rel="noreferrer">
          <Button className="px-3 py-2" variant="secondary">
            <span className="me-2">{it.icon}</span>
            {it.label}
          </Button>
        </a>
      ))}
    </div>
  );
}

function ProjectModal({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useProject(slug);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-56 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <div className="font-extrabold">{t("common.error")}</div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error?.message}</p>
        <div className="mt-4">
          <Button onClick={refetch} variant="secondary">
            {t("common.retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <img
          src={data.cover_image_url || "/projects/ecommerce-react.svg"}
          alt={data.title}
          className="h-56 w-full object-cover"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {data.featured ? <Badge>{t("projects.featured")}</Badge> : null}
          {(data.tags || []).slice(0, 3).map((tg) => (
            <Badge key={tg}>{tg}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LinkButton links={data.links} />
        </div>
      </div>

      <div className="text-xl font-extrabold">{data.title}</div>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {data.description || data.summary || ""}
      </p>

      {(data.gallery || []).length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {data.gallery!.slice(0, 4).map((img) => (
            <div
              key={img}
              className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <img src={img} alt={data.title} className="h-36 w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      ) : null}

      {(data.stack || []).length ? (
        <div>
          <div className="text-sm font-extrabold">{t("projects.stack")}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.stack!.map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
