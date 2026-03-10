import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../../layout/Container";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";
import { useHomeHeroQuery, useProfileQuery } from "../../../app/api/resources";
import { useSettings } from "../../../app/settings/context";
import { isExternalHref, mapHeroStatLabel } from "../../../utils/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function ActionButton({
  href,
  label,
  variant = "primary",
}: {
  href?: string | null;
  label?: string | null;
  variant?: "primary" | "secondary";
}) {
  if (!href || !label) {
    return null;
  }

  const className =
    variant === "secondary"
      ? "rounded-xl border border-slate-200 bg-white px-7 py-3 font-bold transition-transform hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950/50"
      : "rounded-xl px-7 py-3 font-bold shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5";

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        <Button variant={variant === "secondary" ? "secondary" : "primary"} className={className}>
          {label}
        </Button>
      </a>
    );
  }

  return (
    <Link to={href}>
      <Button variant={variant === "secondary" ? "secondary" : "primary"} className={className}>
        {label}
      </Button>
    </Link>
  );
}

export default function Hero() {
  const heroQuery = useHomeHeroQuery();
  const profileQuery = useProfileQuery();
  const { settings } = useSettings();

  const hero = heroQuery.data;
  const profile = profileQuery.data;

  const stats =
    hero?.stats.filter((item) => item.value != null) ||
    [
      { label: "years_experience", value: profile?.years_experience ?? null },
      { label: "projects_delivered", value: profile?.projects_delivered ?? null },
      { label: "clients_count", value: profile?.clients_count ?? null },
    ].filter((item) => item.value != null);

  const trustCards = [
    {
      title:
        profile?.availability_text ||
        hero?.badges[0] ||
        settings?.site_address ||
        "Available for new work",
      desc: profile?.location || settings?.site_address || hero?.description || "",
    },
    {
      title:
        profile?.focus_areas[0] ||
        hero?.badges[1] ||
        settings?.site_title ||
        "API-first delivery",
      desc: profile?.short_bio || hero?.subtitle || "",
    },
    {
      title:
        profile?.projects_delivered != null
          ? `${profile.projects_delivered}+ Projects`
          : hero?.badges[2] || "Shipping reliably",
      desc: profile?.headline || hero?.description || "",
    },
  ];

  if (heroQuery.error && !hero) {
    return (
      <MotionSection className="bg-slate-50 py-12 dark:bg-[#0a0f1c] sm:py-16 lg:py-20">
        <Container>
          <Card className="p-6 sm:p-8">
            <div className="text-lg font-extrabold">Unable to load the hero section</div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {heroQuery.error.message}
            </p>
            <div className="mt-4">
              <Button onClick={heroQuery.refetch}>Retry</Button>
            </div>
          </Card>
        </Container>
      </MotionSection>
    );
  }

  return (
    <MotionSection className="relative overflow-hidden bg-slate-50 py-12 dark:bg-[#0a0f1c] sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] opacity-70" />
        <div className="absolute -right-32 bottom-10 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px] opacity-60" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-2 text-center lg:order-1 lg:text-start"
          >
            <motion.div variants={fadeUp}>
              <Badge className="border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wide text-primary dark:border-primary/30 dark:bg-primary/20">
                {hero?.eyebrow || profile?.full_name || settings?.site_name || "Portfolio"}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              {hero?.title || profile?.headline || settings?.site_title || ""}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0"
            >
              {hero?.subtitle || hero?.description || profile?.short_bio || settings?.site_description}
            </motion.p>

            {(hero?.badges.length || profile?.hero_badges.length) ? (
              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
              >
                {(hero?.badges.length ? hero.badges : profile?.hero_badges || []).map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            ) : null}

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <ActionButton href={hero?.primary_cta.url} label={hero?.primary_cta.label} />
              <ActionButton
                href={hero?.secondary_cta.url}
                label={hero?.secondary_cta.label}
                variant="secondary"
              />
            </motion.div>

            {stats.length ? (
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-slate-200/60 pt-6 dark:border-slate-800/60 lg:justify-start"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      {mapHeroStatLabel(stat.label)}
                    </span>
                  </div>
                ))}
              </motion.div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-xs lg:mr-4">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl opacity-50 transition-opacity duration-500 hover:opacity-70" />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border-2 border-white/20 bg-slate-200 shadow-2xl dark:border-slate-800/80 dark:bg-slate-900">
                {heroQuery.loading && !hero?.image_url && !profile?.profile_image_url ? (
                  <div className="h-full w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
                ) : hero?.image_url || profile?.profile_image_url || settings?.branding.profile_image_url ? (
                  <img
                    src={
                      hero?.image_url ||
                      profile?.profile_image_url ||
                      settings?.branding.profile_image_url ||
                      ""
                    }
                    alt={profile?.full_name || settings?.site_name || "Profile"}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-6xl font-black text-slate-300 dark:text-slate-800">
                    MF
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16"
        >
          {trustCards.map((card) => (
            <div
              key={card.title}
              className="group flex flex-col gap-3 rounded-2xl border border-slate-200/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-slate-700/80 dark:hover:bg-slate-800/60"
            >
              <div className="text-sm font-extrabold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                {card.title}
              </div>
              <div className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                {card.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </MotionSection>
  );
}
