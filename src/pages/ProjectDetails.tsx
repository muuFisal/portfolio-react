import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import MotionSection from "../components/ui/MotionSection";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Seo from "../components/ui/Seo";
import { useProject } from "../app/api/resources";
import { projects as localProjects } from "../data/projects";
import { useTranslation } from "react-i18next";

export default function ProjectDetails() {
  const { slug = "" } = useParams();
  const { t } = useTranslation();
  const { data } = useProject(slug);

  const fallback = useMemo(() => localProjects.find((p) => p.id === slug), [slug]);
  const title = data?.title || (fallback ? t(fallback.titleKey) : "Project");
  const summary = data?.summary || data?.description || (fallback ? t(fallback.descKey) : "");
  const image = data?.cover_image_url || fallback?.image || "/projects/ecommerce-react.svg";
  const stack = data?.stack || fallback?.stack || [];
  const highlights = data?.description
    ? [data.description]
    : (fallback?.highlightsKey || []).map((k) => t(k));
  const links = data?.links || (fallback?.links ? {
    web: fallback.links.web,
    google_play: fallback.links.googlePlay,
    app_store: fallback.links.appStore,
  } : undefined);

  return (
    <>
      <Seo title={`${title} | Mohamed Fisal`} description={summary} image={image} canonicalPath={`/projects/${slug}`} />
      <MotionSection className="py-16 sm:py-20">
        <Container>
          <div className="mb-6">
            <Link to="/projects" className="text-sm font-bold text-primary">← {t("projects.back", { defaultValue: "Back to projects" })}</Link>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 shadow-soft dark:border-slate-800 dark:bg-slate-900/40">
            <img src={image} alt={title} className="h-[280px] w-full object-cover sm:h-[360px]" />
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{t("projects.featured", { defaultValue: "Featured" })}</Badge>
                {(data?.tags || [fallback?.category]).filter(Boolean).map((tag) => (
                  <Badge key={String(tag)}>{String(tag)}</Badge>
                ))}
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{title}</h1>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{summary}</p>

              <div className="mt-8">
                <h2 className="text-xl font-extrabold">{t("projects.highlights", { defaultValue: "Key highlights" })}</h2>
                <div className="mt-4 space-y-3">
                  {highlights.map((item) => (
                    <Card key={item} className="p-5">
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <Card className="p-6">
                <h3 className="text-lg font-extrabold">{t("projects.stack", { defaultValue: "Tech stack" })}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold dark:border-slate-800 dark:bg-slate-950">{item}</span>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-extrabold">{t("projects.links", { defaultValue: "Project links" })}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {links?.web ? <a href={links.web} target="_blank" rel="noreferrer"><Button>{t("projects.live", { defaultValue: "Live" })}</Button></a> : null}
                  {links?.google_play ? <a href={links.google_play} target="_blank" rel="noreferrer"><Button variant="ghost">{t("projects.googlePlay", { defaultValue: "Google Play" })}</Button></a> : null}
                  {links?.app_store ? <a href={links.app_store} target="_blank" rel="noreferrer"><Button variant="ghost">{t("projects.appStore", { defaultValue: "App Store" })}</Button></a> : null}
                  {!links?.web && !links?.google_play && !links?.app_store ? (
                    <p className="text-sm text-slate-600 dark:text-slate-300">{t("projects.private", { defaultValue: "This project can be showcased privately or on request." })}</p>
                  ) : null}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-extrabold">{t("projects.consulting", { defaultValue: "Need something similar?" })}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {t("projects.consultingDesc", { defaultValue: "I build custom systems with strong backend architecture, polished dashboards, and reliable integrations." })}
                </p>
                <div className="mt-4">
                  <Link to="/contact"><Button variant="secondary">{t("projects.contact", { defaultValue: "Let’s talk" })}</Button></Link>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </MotionSection>
    </>
  );
}
