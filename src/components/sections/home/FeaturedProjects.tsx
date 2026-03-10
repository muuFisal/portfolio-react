import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useHomeFeaturedProjectsQuery } from "../../../app/api/resources";
import { formatDate } from "../../../utils/portfolio";
import Container from "../../layout/Container";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";
import SectionHeader from "../../ui/SectionHeader";

export default function FeaturedProjects() {
  const { i18n } = useTranslation();
  const { data, loading, error, refetch } = useHomeFeaturedProjectsQuery();
  const items = data?.items || [];

  return (
    <MotionSection className="py-14">
      <Container>
        <SectionHeader
          title={data?.title || "Featured Projects"}
          subtitle={data?.subtitle || data?.description || ""}
        />

        {error ? (
          <Card className="mb-5 p-5">
            <div className="font-extrabold">Unable to load featured projects</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4">
              <Button onClick={refetch} variant="secondary">
                Retry
              </Button>
            </div>
          </Card>
        ) : null}

        <div className="grid gap-5 md:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden p-0">
                  <div className="h-40 w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
                  <div className="p-5">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </Card>
              ))
            : items.map((project) => (
                <motion.div
                  key={project.id}
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
                      <div className="absolute start-3 top-3 flex flex-wrap gap-2">
                        {project.featured ? <Badge>Featured</Badge> : null}
                        {project.category ? <Badge>{project.category}</Badge> : null}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-lg font-extrabold">{project.title}</div>
                        {project.project_date ? (
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {formatDate(project.project_date, i18n.language)}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                        {project.summary}
                      </p>

                      {project.tags.length ? (
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
                      ) : null}

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
          <Card className="mt-5 p-5 text-sm text-slate-600 dark:text-slate-300">
            Featured projects will appear here once they are published.
          </Card>
        ) : null}

        <div className="mt-6 flex justify-center">
          <Link to="/projects">
            <Button className="px-6 py-2.5">Browse all projects</Button>
          </Link>
        </div>
      </Container>
    </MotionSection>
  );
}
