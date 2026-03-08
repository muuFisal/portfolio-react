import Container from "../components/layout/Container";
import MotionSection from "../components/ui/MotionSection";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Seo from "../components/ui/Seo";
import { useSettings } from "../app/settings/context";
import { getProfileData } from "../utils/profile";
import { useTranslation } from "react-i18next";

export default function About() {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const profile = getProfileData(settings);

  const VALUES = [
    {
      title: t("about.v1.title", "Architecture that survives growth"),
      desc: t("about.v1.desc", "I care about structure, separation of concerns, maintainability, and clean scaling paths from day one."),
    },
    {
      title: t("about.v2.title", "Business-first execution"),
      desc: t("about.v2.desc", "I translate requirements into systems that teams can actually operate, extend, and trust in production."),
    },
    {
      title: t("about.v3.title", "Frontend awareness"),
      desc: t("about.v3.desc", "Even as a backend-first engineer, I build polished interfaces with React when the product needs a stronger user experience."),
    },
    {
      title: t("about.v4.title", "Production reliability"),
      desc: t("about.v4.desc", "Payments, wallets, webhooks, queues, permissions, logs, and edge cases are all part of the job — not after thoughts."),
    },
  ];

  return (
    <>
      <Seo
        title={`${profile.fullName} | About`}
        description={profile.longBio}
        canonicalPath="/about"
      />
      <MotionSection className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr,1.2fr] lg:items-start">
            <Card className="overflow-hidden p-0">
              <div className="h-80 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt={profile.fullName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-7xl font-black text-slate-400 dark:text-slate-600">
                    {profile.fullName.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-2xl font-extrabold">{t("about.profile.fullName", profile.fullName)}</div>
                <div className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-300">
                  {t("about.profile.headline", profile.headline)}
                </div>
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                  {t("about.profile.location", profile.location)}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    t("about.profile.focus1", profile.primaryFocus[0] || "ERP / CRM Architecture"),
                    t("about.profile.focus2", profile.primaryFocus[1] || "Laravel + Livewire Systems"),
                    t("about.profile.focus3", profile.primaryFocus[2] || "React + TypeScript Frontends"),
                    t("about.profile.focus4", profile.primaryFocus[3] || "Payments, Wallets & Webhooks"),
                  ].filter(Boolean).map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold dark:border-slate-800 dark:bg-slate-950">
                      {item}
                    </span>
                  ))}
                </div>
                <a href={profile.cvUrl || "#"} target="_blank" rel="noreferrer" className="mt-6 inline-flex">
                  <Button className="w-full">{t("about.downloadCv", { defaultValue: "Download CV" })}</Button>
                </a>
              </div>
            </Card>

            <div>
              <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-extrabold text-primary">
                {t("about.badge", { defaultValue: "About Me" })}
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {t("about.title", { defaultValue: "A senior engineer focused on scalable products and reliable delivery." })}
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{profile.longBio}</p>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                {t("about.extra", { defaultValue: "My work spans ERP, CRM, manufacturing, e-commerce, and fintech products. I enjoy turning complex workflows into maintainable systems with clear architecture, secure integrations, and practical user experiences." })}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  [profile.years, t("about.metrics.years", { defaultValue: "Years of experience" })],
                  ["Laravel + React", t("about.metrics.stack", { defaultValue: "Main delivery stack" })],
                  ["ERP • CRM • FinTech", t("about.metrics.domain", { defaultValue: "Domain depth" })],
                ].map(([value, label]) => (
                  <Card key={label} className="p-5">
                    <div className="text-2xl font-extrabold">{value}</div>
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{label}</div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {VALUES.map((item) => (
                  <Card key={item.title} className="p-6">
                    <h3 className="text-lg font-extrabold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </MotionSection>
    </>
  );
}
