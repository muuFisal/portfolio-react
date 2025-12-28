import React from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import MotionSection from "../../ui/MotionSection";
import { projects, Project, ProjectCategory } from "../../../data/projects";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const categories: (ProjectCategory | "All")[] = ["All", "ERP", "CRM", "FinTech", "EdTech", "Ecommerce"];

export default function ProjectsGrid() {
  const { t } = useTranslation();
  const [cat, setCat] = React.useState<(typeof categories)[number]>("All");
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const okCat = cat === "All" ? true : p.category === cat;
    const query = q.trim().toLowerCase();
    const okQ =
      !query ||
      t(p.titleKey).toLowerCase().includes(query) ||
      t(p.descKey).toLowerCase().includes(query) ||
      p.stack.join(" ").toLowerCase().includes(query);

    return okCat && okQ;
  });

  const openProject = (p: Project) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <MotionSection className="py-10">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition
                ${
                  cat === c
                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50"
                }`}
              >
                {c === "All" ? t("projects.filters.all") : c}
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <Card className="group overflow-hidden p-0">
                {/* image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <img
                    src={p.image || "/projects/ecommerce-react.svg"}
                    alt={t(p.titleKey)}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute start-3 top-3 flex items-center gap-2">
                    {p.featured ? (
                      <Badge>{t("projects.featured")}</Badge>
                    ) : (
                      <Badge>{p.category}</Badge>
                    )}
                  </div>

                  <div className="absolute end-3 top-3 flex items-center gap-2">
                    <LinkPills links={p.links} />
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-lg font-extrabold">{t(p.titleKey)}</div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {t(p.descKey)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <Button
                      onClick={() => openProject(p)}
                      variant="secondary"
                      className="px-4 py-2"
                    >
                      {t("projects.view")}
                    </Button>
                    <span className="text-xs font-bold text-slate-400">
                      {t("projects.tap")}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Modal open={open} onClose={() => setOpen(false)} title={selected ? t(selected.titleKey) : ""}>
          {selected && (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <img
                  src={selected.image || "/projects/ecommerce-react.svg"}
                  alt={t(selected.titleKey)}
                  className="h-56 w-full object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{selected.category}</Badge>
                  {selected.featured ? <Badge>{t("projects.featured")}</Badge> : null}
                </div>
                <div className="flex items-center gap-2">
                  <LinkButton links={selected.links} />
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300">{t(selected.descKey)}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-extrabold">{t("projects.stack")}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-extrabold">{t("projects.highlights")}</div>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {selected.highlightsKey.map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />
                        <span>{t(k)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MotionSection>
  );
}

function LinkPills({ links }: { links?: Project["links"] }) {
  if (!links) return null;

  const items = [
    links.web ? { k: "web", href: links.web, label: "Web", icon: "🌐" } : null,
    links.googlePlay ? { k: "gp", href: links.googlePlay, label: "Google Play", icon: "▶" } : null,
    links.appStore ? { k: "as", href: links.appStore, label: "App Store", icon: "" } : null,
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
    links.googlePlay ? { k: "gp", href: links.googlePlay, label: "Google Play", icon: "▶" } : null,
    links.appStore ? { k: "as", href: links.appStore, label: "App Store", icon: "" } : null,
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
