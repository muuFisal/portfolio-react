import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjectQuery } from "../app/api/resources";
import Container from "../components/layout/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import MotionSection from "../components/ui/MotionSection";
import Seo from "../components/ui/Seo";
import { formatDate, isExternalHref } from "../utils/portfolio";

function LinkButton({ href, label }: { href?: string | null; label: string }) {
  if (!href) {
    return null;
  }

  return (
    <a href={href} target={isExternalHref(href) ? "_blank" : undefined} rel="noreferrer">
      <Button variant="secondary">{label}</Button>
    </a>
  );
}

export default function ProjectDetails() {
  const { slug = "" } = useParams();
  const { i18n } = useTranslation();
  const { data, loading, error, refetch } = useProjectQuery(slug);

  const title = data?.seo.title || data?.title || "Project";
  const description = data?.seo.description || data?.summary || data?.description || undefined;
  const image = data?.og_image_url || data?.cover_image_url || data?.gallery[0]?.url || undefined;

  return (
    <>
      <Seo
        title={title}
        description={description}
        keywords={data?.seo.keywords}
        image={image}
        canonicalPath={`/projects/${slug}`}
        type="article"
      />
      <MotionSection className="py-16 sm:py-20">
        <Container>
          <div className="mb-6">
            <Link to="/projects" className="text-sm font-bold text-primary">
              ← Back to projects
            </Link>
          </div>

          {error ? (
            <Card className="mb-6 p-6">
              <div className="text-lg font-extrabold">Unable to load this project</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
              <div className="mt-4">
                <Button onClick={refetch}>Retry</Button>
              </div>
            </Card>
          ) : null}

          {loading && !data ? (
            <Card className="overflow-hidden p-0">
              <div className="h-[280px] w-full animate-pulse bg-slate-200 dark:bg-slate-800 sm:h-[360px]" />
            </Card>
          ) : null}

          {data ? (
            <>
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 shadow-soft dark:border-slate-800 dark:bg-slate-900/40">
                {data.cover_image_url || data.gallery[0]?.url ? (
                  <img
                    src={data.cover_image_url || data.gallery[0]?.url || ""}
                    alt={data.title}
                    className="h-[280px] w-full object-cover sm:h-[360px]"
                  />
                ) : (
                  <div className="h-[280px] w-full bg-gradient-to-br from-primary/20 via-slate-100 to-secondary/20 dark:from-primary/20 dark:via-slate-900 dark:to-secondary/20 sm:h-[360px]" />
                )}
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {data.featured ? <Badge>Featured</Badge> : null}
                    {data.category ? <Badge>{data.category}</Badge> : null}
                    {data.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{data.title}</h1>
                  <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                    {data.summary}
                  </p>

                  {data.description ? (
                    <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                      {data.description}
                    </p>
                  ) : null}

                  {data.metrics.length ? (
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      {data.metrics.map((metric) => (
                        <Card key={metric.label} className="p-5">
                          <div className="text-2xl font-extrabold">{metric.value}</div>
                          <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            {metric.label}
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : null}

                  {data.highlights.length ? (
                    <div className="mt-8">
                      <h2 className="text-xl font-extrabold">Highlights</h2>
                      <div className="mt-4 space-y-3">
                        {data.highlights.map((item) => (
                          <Card key={item} className="p-5">
                            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                              {item}
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {(data.challenges.length || data.solutions.length) ? (
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      {data.challenges.length ? (
                        <Card className="p-6">
                          <h2 className="text-xl font-extrabold">Challenges</h2>
                          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {data.challenges.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </Card>
                      ) : null}

                      {data.solutions.length ? (
                        <Card className="p-6">
                          <h2 className="text-xl font-extrabold">Solutions</h2>
                          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {data.solutions.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </Card>
                      ) : null}
                    </div>
                  ) : null}

                  {data.gallery.length ? (
                    <div className="mt-8">
                      <h2 className="text-xl font-extrabold">Gallery</h2>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {data.gallery.map((item, index) =>
                          item.url ? (
                            <Card key={`${item.url}-${index}`} className="overflow-hidden p-0">
                              <img
                                src={item.url}
                                alt={item.alt || data.title}
                                className="h-56 w-full object-cover"
                              />
                            </Card>
                          ) : null
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-5">
                  <Card className="p-6">
                    <h3 className="text-lg font-extrabold">Project snapshot</h3>
                    <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                      {data.client_name ? (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            Client
                          </div>
                          <div className="mt-1 font-semibold text-slate-900 dark:text-white">
                            {data.client_name}
                          </div>
                        </div>
                      ) : null}
                      {data.project_date ? (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            Date
                          </div>
                          <div className="mt-1 font-semibold text-slate-900 dark:text-white">
                            {formatDate(data.project_date, i18n.language)}
                          </div>
                        </div>
                      ) : null}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                          Open source
                        </div>
                        <div className="mt-1 font-semibold text-slate-900 dark:text-white">
                          {data.is_open_source ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                  </Card>

                  {data.stack.length ? (
                    <Card className="p-6">
                      <h3 className="text-lg font-extrabold">Tech stack</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {data.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold dark:border-slate-800 dark:bg-slate-950"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ) : null}

                  <Card className="p-6">
                    <h3 className="text-lg font-extrabold">Project links</h3>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <LinkButton href={data.links.web} label="Live" />
                      <LinkButton href={data.links.repository} label="Repository" />
                      <LinkButton href={data.links.case_study} label="Case study" />
                      <LinkButton href={data.links.google_play} label="Google Play" />
                      <LinkButton href={data.links.app_store} label="App Store" />
                    </div>
                    {!data.links.web &&
                    !data.links.repository &&
                    !data.links.case_study &&
                    !data.links.google_play &&
                    !data.links.app_store ? (
                      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                        This project is private and can be discussed on request.
                      </p>
                    ) : null}
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-extrabold">Need something similar?</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      I build custom systems with strong backend architecture, polished dashboards,
                      and reliable integrations.
                    </p>
                    <div className="mt-4">
                      <Link to="/contact">
                        <Button variant="secondary">Let's talk</Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          ) : null}
        </Container>
      </MotionSection>
    </>
  );
}
