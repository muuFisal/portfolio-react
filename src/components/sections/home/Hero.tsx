import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import MotionSection from "../../ui/MotionSection";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <MotionSection className="relative overflow-hidden py-16 sm:py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />
          <div className="absolute -right-24 top-36 h-72 w-72 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />
          <div className="absolute left-1/2 top-[-120px] h-72 w-72 -translate-x-1/2 rounded-full bg-slate-200 blur-3xl dark:bg-slate-800" />
        </div>

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.10] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.35) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 55%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 55%, transparent 75%)",
          }}
        />
      </div>

      <Container>
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left / Main copy */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <Badge>{t("home.hero.badge")}</Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              <span className="relative inline-block">
                {t("home.hero.title")}
                <span className="absolute -bottom-2 start-0 h-1 w-24 rounded-full bg-slate-900/70 dark:bg-white/70" />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300"
            >
              {t("home.hero.desc")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
              <Link to="/projects">
                <Button className="px-5 py-2.5">{t("home.hero.ctaProjects")}</Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" className="px-5 py-2.5">
                  {t("home.hero.ctaContact")}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-3 gap-3"
            >
              <Stat k={t("home.hero.stats.s1k")} v={t("home.hero.stats.s1v")} />
              <Stat k={t("home.hero.stats.s2k")} v={t("home.hero.stats.s2v")} />
              <Stat k={t("home.hero.stats.s3k")} v={t("home.hero.stats.s3v")} />
            </motion.div>
          </motion.div>

          {/* Right / Proof card */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative"
          >
            <div className="absolute -inset-2 rounded-[28px] bg-slate-900/10 blur-xl dark:bg-white/10" />

            <div className="relative rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-bold text-slate-500 dark:text-slate-300">
                  {t("home.hero.cardTitle")}
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                  UI • API • Systems
                </span>
              </div>

              <div className="mt-4 grid gap-3">
                <FloatingLine
                  delay={0.05}
                  title={t("home.hero.card.l1t")}
                  desc={t("home.hero.card.l1d")}
                  icon="🏗️"
                />
                <FloatingLine
                  delay={0.12}
                  title={t("home.hero.card.l2t")}
                  desc={t("home.hero.card.l2d")}
                  icon="💳"
                />
                <FloatingLine
                  delay={0.18}
                  title={t("home.hero.card.l3t")}
                  desc={t("home.hero.card.l3d")}
                  icon="⚡"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                <div className="font-extrabold">{t("home.highlights.title")}</div>
                <p className="mt-1 text-slate-600 dark:text-slate-300">
                  {t("home.highlights.subtitle")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Laravel</Pill>
                  <Pill>Livewire</Pill>
                  <Pill>React</Pill>
                  <Pill>TypeScript</Pill>
                  <Pill>Webhooks</Pill>
                  <Pill>Payments</Pill>
                  <Pill>i18n</Pill>
                  <Pill>RTL</Pill>
                </div>
              </div>
            </div>

            {/* small floating dots */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-3 top-10 hidden h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700 sm:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-3 bottom-12 hidden h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700 sm:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </Container>
    </MotionSection>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="text-xl font-extrabold">{v}</div>
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">
        {k}
      </div>
    </motion.div>
  );
}

function FloatingLine({
  title,
  desc,
  icon,
  delay,
}: {
  title: string;
  desc: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      className="group rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-slate-900">
          {icon}
        </div>
        <div>
          <div className="font-extrabold">{title}</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {desc}
          </div>
        </div>
      </div>
      <div className="mt-3 h-[2px] w-0 rounded-full bg-slate-900/70 transition-all duration-300 group-hover:w-full dark:bg-white/70" />
    </motion.div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-200">
      {children}
    </span>
  );
}