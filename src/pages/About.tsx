import { useAboutQuery, useProfileQuery } from "../app/api/resources";
import { useSettings } from "../app/settings/context";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import MotionSection from "../components/ui/MotionSection";
import Seo from "../components/ui/Seo";
import { getIconNode } from "../utils/icon-map";

export default function About() {
  const aboutQuery = useAboutQuery();
  const profileQuery = useProfileQuery();
  const { settings } = useSettings();

  const about = aboutQuery.data;
  const profile = profileQuery.data;
  const image =
    about?.profile_image_url ||
    profile?.profile_image_url ||
    settings?.branding.profile_image_url ||
    "";
  const resumeUrl =
    about?.resume_url || profile?.resume_url || settings?.branding.resume_url || "";
  const focusAreas = about?.focus_areas.length
    ? about.focus_areas
    : profile?.focus_areas || [];
  const metrics = about?.highlights.length
    ? about.highlights
    : [
        {
          id: 1,
          title: "Years Experience",
          description: profile?.headline || null,
          icon: "briefcase",
          value: profile?.years_experience || null,
          unit: profile?.years_experience ? "+" : null,
        },
        {
          id: 2,
          title: "Projects Delivered",
          description: profile?.short_bio || null,
          icon: "chart",
          value: profile?.projects_delivered || null,
          unit: profile?.projects_delivered ? "+" : null,
        },
        {
          id: 3,
          title: "Clients",
          description: profile?.availability_text || null,
          icon: "handshake",
          value: profile?.clients_count || null,
          unit: profile?.clients_count ? "+" : null,
        },
      ];

  return (
    <>
      <Seo
        pageKey="about"
        title={about?.title ? `${profile?.full_name || settings?.site_name} | ${about.title}` : undefined}
        description={about?.summary || about?.story || profile?.long_bio || undefined}
        canonicalPath="/about"
      />
      <MotionSection className="py-16 sm:py-20">
        <Container>
          {aboutQuery.error ? (
            <Card className="mb-6 p-6">
              <div className="text-lg font-extrabold">Unable to load the about page</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {aboutQuery.error.message}
              </p>
              <div className="mt-4">
                <Button onClick={aboutQuery.refetch}>Retry</Button>
              </div>
            </Card>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr] lg:items-start">
            <Card className="overflow-hidden p-0">
              <div className="h-80 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
                {image ? (
                  <img
                    src={image}
                    alt={profile?.full_name || settings?.site_name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl font-black text-slate-400 dark:text-slate-600">
                    {(profile?.full_name || settings?.site_name || "MF")
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-2xl font-extrabold">
                  {profile?.full_name || settings?.site_name || "Portfolio"}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-300">
                  {profile?.headline || settings?.site_title}
                </div>
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                  {profile?.location || settings?.site_address}
                </div>
                {focusAreas.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {focusAreas.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold dark:border-slate-800 dark:bg-slate-950"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
                {resumeUrl ? (
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex">
                    <Button className="w-full">Download Resume</Button>
                  </a>
                ) : null}
              </div>
            </Card>

            <div>
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-extrabold text-primary">
                {about?.subtitle || "About"}
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {about?.title || profile?.headline || settings?.site_title}
              </h1>
              {about?.summary ? (
                <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
                  {about.summary}
                </p>
              ) : null}
              {about?.story || profile?.long_bio ? (
                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                  {about?.story || profile?.long_bio}
                </p>
              ) : null}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {metrics.slice(0, 3).map((item) => (
                  <Card key={item.id} className="p-5">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {getIconNode(item.icon)}
                    </div>
                    <div className="mt-4 text-2xl font-extrabold">
                      {item.value != null ? `${item.value}${item.unit || ""}` : item.title}
                    </div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {item.title}
                    </div>
                  </Card>
                ))}
              </div>

              {about?.values.length ? (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {about.values.map((item) => (
                    <Card key={item.title} className="p-6">
                      <h3 className="text-lg font-extrabold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </Card>
                  ))}
                </div>
              ) : null}

              {aboutQuery.loading && !about ? (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="p-6">
                      <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </Card>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </MotionSection>
    </>
  );
}
