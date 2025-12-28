import Container from "../../layout/Container";
import SectionFX from "../../ui/SectionFX";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function CTA() {
  const { t } = useTranslation();

  const questions = [
    t("cta.q1"),
    t("cta.q2"),
    t("cta.q3"),
    t("cta.q4"),
  ];

  return (
    <section className="relative py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/40 sm:p-10"
        >
          <div className="pointer-events-none absolute -end-24 -top-24 h-56 w-56 rounded-full bg-slate-200/70 blur-3xl dark:bg-slate-800/70" />
          <div className="pointer-events-none absolute -start-24 -bottom-24 h-56 w-56 rounded-full bg-slate-200/70 blur-3xl dark:bg-slate-800/70" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(148,163,184,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.4) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 78%)",
            }}
          />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {t("cta.title")}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t("cta.subtitle")}
              </p>

              <div className="mt-6 grid gap-3">
                {questions.map((q, i) => (
                  <motion.div
                    key={q}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.65 }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/25"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-slate-900">
                      ✨
                    </span>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {q}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Link to="/contact">
                <Button className="px-6 py-3">{t("cta.primary")}</Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" className="px-6 py-3">
                  {t("cta.secondary")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
