import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import MotionSection from "../../ui/MotionSection";
import { useSettings } from "../../../app/settings/context";
import { getProfileData } from "../../../utils/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Hero() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const profile = getProfileData(settings);

  return (
    <MotionSection className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-[#0a0f1c]">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] opacity-70" />
        <div className="absolute -right-32 bottom-10 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px] opacity-60" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* Left Side: Main Content */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="text-center lg:text-start order-2 lg:order-1">
            <motion.div variants={fadeUp}>
              <Badge className="px-4 py-1.5 text-xs font-bold tracking-wide bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:border-primary/30">
                {t("home.hero.badge", "Senior Backend Engineer / Architect")}
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white leading-[1.1]">
              {t("home.hero.headline", "Architecting systems that scale gracefully.")}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
              {t("home.hero.subtitle", "I build production-grade platforms with Laravel and React. From massive ERPs to sensitive payment gateways, I focus on reliability, clean code, and fast execution.")}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <Link to="/projects">
                <Button className="px-7 py-3 rounded-xl shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 font-bold">
                  {t("home.hero.ctaProjects", "My Best Work")}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" className="px-7 py-3 rounded-xl border border-slate-200 dark:border-slate-800 transition-transform hover:-translate-y-0.5 bg-white dark:bg-slate-950/50 font-bold">
                  {t("home.hero.ctaContact", "Let's Talk")}
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center lg:justify-start items-center gap-6 border-t border-slate-200/60 dark:border-slate-800/60 pt-6">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{t("home.hero.stats.projectsVal", "30+")}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{t("home.hero.stats.projects", "Systems Built")}</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{t("home.hero.stats.deliveryVal", "100%")}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{t("home.hero.stats.delivery", "Delivery Rate")}</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{t("home.hero.stats.langsVal", "AR/EN")}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{t("home.hero.stats.langs", "Native i18n")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            {/* Premium Photo Wrapper */}
            <div className="relative max-w-[280px] sm:max-w-xs w-full lg:mr-4">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl opacity-50 transition-opacity duration-500 hover:opacity-70" />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border-2 border-white/20 bg-slate-200 dark:border-slate-800/80 dark:bg-slate-900 shadow-2xl">
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt={profile.fullName} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-6xl font-black text-slate-300 dark:text-slate-800">
                    MF
                  </div>
                )}
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* 3 Trust Cards row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 lg:mt-16 grid gap-4 grid-cols-1 sm:grid-cols-3"
        >
          <TrustCard icon="⚡" title={t("home.trust.exp", "7+ Years Experience")} desc={t("home.trust.expDesc", "Delivering robust systems")} />
          <TrustCard icon="🏗️" title={t("home.trust.domain", "ERP / CRM / Payments")} desc={t("home.trust.domainDesc", "Complex domain architecture")} />
          <TrustCard icon="💼" title={t("home.trust.remote", "Available for Consulting")} desc={t("home.trust.remoteDesc", "Remote delivery worldwide")} />
        </motion.div>
      </Container>
    </MotionSection>
  );
}

function TrustCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-4 rounded-2xl border border-slate-200/60 bg-white/60 p-5 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-slate-700/80 dark:hover:bg-slate-800/60">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl dark:bg-slate-800 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</div>
        <div className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400 mt-1">{desc}</div>
      </div>
    </div>
  );
}
