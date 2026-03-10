import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProjectsQuery } from "../../../app/api/resources";
import Pagination from "../../ui/Pagination";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function parseNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default function ProjectsGrid() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      featured: searchParams.get("featured") === "true" ? true : undefined,
      category: searchParams.get("category") || undefined,
      tag: searchParams.get("tag") || undefined,
      page: parseNumber(searchParams.get("page"), 1),
      per_page: parseNumber(searchParams.get("per_page"), 9),
    }),
    [searchParams]
  );

  const { data, loading, error, refetch, pagination } = useProjectsQuery(filters);
  const items = data?.items || [];
  const categories = data?.filters.categories || [];
  const tags = data?.filters.tags || [];

  const updateParams = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(next).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (!next.page) {
      params.set("page", "1");
    }

    setSearchParams(params, { replace: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-950/30 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Backend filters
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => updateParams({ category: null, page: "1" })}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                !filters.category
                  ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                  : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50",
              ].join(" ")}
            >
              All categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => updateParams({ category, page: "1" })}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  filters.category === category
                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Tag
            </span>
            <select
              value={filters.tag || ""}
              onChange={(event) => updateParams({ tag: event.target.value || null, page: "1" })}
              className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-semibold outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
            >
              <option value="">All tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Per page
            </span>
            <select
              value={filters.per_page}
              onChange={(event) => updateParams({ per_page: event.target.value, page: "1" })}
              className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-2.5 text-sm font-semibold outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950/30 dark:text-white"
            >
              {[6, 9, 12].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() =>
                updateParams({
                  featured: filters.featured ? null : "true",
                  page: "1",
                })
              }
              className={[
                "w-full rounded-2xl border px-4 py-2.5 text-sm font-semibold transition",
                filters.featured
                  ? "border-primary bg-primary text-white"
                  : "border-slate-200 bg-white/70 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-900/50",
              ].join(" ")}
            >
              {filters.featured ? "Featured only" : "Show featured"}
            </button>
          </div>
        </div>
      </div>

      {data?.summary ? (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Showing {data.summary.returned_items} of {data.summary.total_items} projects
        </div>
      ) : null}

      {error ? (
        <Card className="p-5">
          <div className="font-extrabold">Unable to load projects</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
          <div className="mt-4">
            <Button onClick={refetch} variant="ghost">
              Retry
            </Button>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading && !items.length
          ? Array.from({ length: filters.per_page }).map((_, index) => (
              <Card key={index} className="overflow-hidden p-0">
                <div className="h-44 w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
                <div className="p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </Card>
            ))
          : items.map((project) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
              >
                <Card className="group overflow-hidden p-0">
                  <div className="relative">
                    {project.cover_image_url ? (
                      <img
                        src={project.cover_image_url}
                        alt={project.title}
                        className="h-44 w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-primary/20 via-slate-100 to-secondary/20 dark:from-primary/20 dark:via-slate-900 dark:to-secondary/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute start-3 top-3 flex items-center gap-2">
                      {project.featured ? <Badge>Featured</Badge> : null}
                      {project.category ? <Badge>{project.category}</Badge> : null}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-lg font-extrabold">{project.title}</div>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <Link to={`/projects/${project.slug}`}>
                        <Button variant="secondary" className="px-4 py-2">
                          View details
                        </Button>
                      </Link>
                      {project.links.web ? (
                        <a
                          href={project.links.web}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-primary"
                        >
                          Live site
                        </a>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
      </div>

      {!loading && !items.length && !error ? (
        <Card className="p-6 text-center">
          <div className="text-lg font-extrabold">No projects matched these filters</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Try clearing one or more filters to widen the result set.
          </p>
        </Card>
      ) : null}

      {pagination ? (
        <Pagination
          page={pagination.page}
          lastPage={pagination.last_page}
          onPageChange={(page) => updateParams({ page: String(page) })}
        />
      ) : null}
    </div>
  );
}
