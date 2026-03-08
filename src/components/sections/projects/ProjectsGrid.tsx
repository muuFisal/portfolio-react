import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProjects, type Project } from "../../../app/api/resources";
import { projects as localProjects } from "../../../data/projects";
import MotionSection from "../../ui/MotionSection";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function normalizeLocal(t: any) {
  return localProjects.map((p) => ({
    id: Number(p.id.length),
    slug: p.id,
    title: t(p.titleKey),
    summary: t(p.descKey),
    cover_image_url: p.image,
    tags: [p.category],
    featured: p.featured,
    stack: p.stack,
    links: {
      web: p.links?.web,
      google_play: p.links?.googlePlay,
      app_store: p.links?.appStore,
    },
  }));
}

export default function ProjectsGrid() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useProjects();
  const [tag, setTag] = useState("All");
  const [q, setQ] = useState("");

  const items = (data && data.length ? data : normalizeLocal(t)) as Project[];
  const tags = useMemo(() => Array.from(new Set(items.flatMap((p) => p.tags || []))).sort(), [items]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((p) => {
      const matchTag = tag === "All" || (p.tags || []).includes(tag);
      const haystack = [p.title, p.summary || "", ...(p.stack || []), ...(p.tags || [])].join(" ").toLowerCase();
      const matchQuery = !query || haystack.includes(query);
      return matchTag && matchQuery;
    });
  }, [items, tag, q]);

  return (
    <MotionSection className="py-10">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTag("All")} className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${tag === "All" ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900" : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50"}`}>{t("projects.filters.all")}</button>
            {tags.map((c) => (
              <button key={c} onClick={() => setTag(c)} className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${tag === c ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900" : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50"}`}>{c}</button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("projects.filters.search")} className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-semibold outline-none placeholder:text-slate-400 focus:border-slate-400 md:max-w-xs dark:border-slate-800 dark:bg-slate-950/30 dark:text-white" />
        </div>

        {error ? (
          <Card className="p-5">
            <div className="font-extrabold">{t("common.error")}</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4"><Button onClick={refetch} variant="ghost">{t("common.retry")}</Button></div>
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
                <motion.div key={p.slug || p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.45 }}>
                  <Card className="group overflow-hidden p-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                      <img src={p.cover_image_url || "/projects/ecommerce-react.svg"} alt={p.title} className="h-44 w-full object-cover" loading="lazy" />
                      <div className="absolute start-3 top-3 flex items-center gap-2">
                        {p.featured ? <Badge>{t("projects.featured")}</Badge> : null}
                        {p.tags?.length ? <Badge>{p.tags[0]}</Badge> : null}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-lg font-extrabold">{p.title}</div>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{p.summary || ""}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {(p.stack || []).slice(0, 4).map((s) => (
                          <span key={s} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">{s}</span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between">
                        <Link to={`/projects/${p.slug}`}><Button variant="secondary" className="px-4 py-2">{t("projects.view")}</Button></Link>
                        <span className="text-xs font-bold text-slate-400">SEO page</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div>
    </MotionSection>
  );
}
