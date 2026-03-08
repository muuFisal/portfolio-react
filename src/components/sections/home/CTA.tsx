import Container from "../../layout/Container";
import SectionFX from "../../ui/SectionFX";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function CTA() {
  const { t } = useTranslation();

  const questions = [
    { title: t("cta.q1.title", "Scalable Systems"), text: t("cta.q1.text", "Need a system that scales with your business without breaking?"), icon: "📈" },
    { title: t("cta.q2.title", "Custom Workflows"), text: t("cta.q2.text", "Want custom solutions that fit your workflow — not generic templates?"), icon: "⚙️" },
    { title: t("cta.q3.title", "Reliable Payments"), text: t("cta.q3.text", "Need reliable payments, wallet flows, and webhooks with clean callbacks?"), icon: "💳" },
    { title: t("cta.q4.title", "Clear Visibility"), text: t("cta.q4.text", "Looking for a fast dashboard with clear data, logs, and reports?"), icon: "📊" },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/40 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/40 sm:p-12">
          {/* Subtle glow decorations */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-[80px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-secondary/10 blur-[80px]" />

          {/* Header Row */}
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-10">
            <div className="max-w-xl">
              <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {t("cta.title", "Need a scalable product?")}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {t("cta.subtitle", "Let’s align on goals, set priorities, and ship a clear result — without over-engineering.")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/contact">
                <Button className="px-6 py-3.5 shadow-md shadow-primary/20 transition-transform hover:-translate-y-0.5 whitespace-nowrap">
                  {t("cta.primary", "Contact Me")}
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" className="px-6 py-3.5 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 transition-transform hover:-translate-y-0.5 whitespace-nowrap">
                  {t("cta.secondary", "Browse projects")}
                </Button>
              </Link>
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className="relative grid gap-4 sm:grid-cols-2">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800/80 dark:bg-slate-950/60 dark:hover:border-slate-700/80 dark:hover:shadow-slate-900/50"
              >
                {/* Micro animation icon */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                    {q.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {q.title}
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {q.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
