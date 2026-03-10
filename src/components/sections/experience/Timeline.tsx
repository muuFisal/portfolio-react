import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { ExperienceItem } from "../../../app/api/types";
import { formatDateRange } from "../../../utils/portfolio";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";

export default function Timeline({
  experiences,
  loading,
  error,
  onRetry,
}: {
  experiences: ExperienceItem[];
  loading: boolean;
  error: { message: string } | null;
  onRetry: () => void;
}) {
  const { i18n } = useTranslation();

  return (
    <MotionSection>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold">Timeline</h3>
          {error ? (
            <Button onClick={onRetry} variant="secondary" className="px-3 py-2">
              Retry
            </Button>
          ) : null}
        </div>

        <div className="mt-5 space-y-4">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))
            : experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-extrabold">{experience.role}</div>
                      <div className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                        {[experience.company, experience.location].filter(Boolean).join(" • ")}
                      </div>
                      {experience.employment_type ? (
                        <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                          {experience.employment_type}
                        </div>
                      ) : null}

                      {experience.summary ? (
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                          {experience.summary}
                        </p>
                      ) : null}

                      {experience.highlights.length ? (
                        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          {experience.highlights.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {formatDateRange(
                        experience.start_date,
                        experience.end_date,
                        experience.is_current,
                        i18n.language
                      ) ? (
                        <Badge>
                          {formatDateRange(
                            experience.start_date,
                            experience.end_date,
                            experience.is_current,
                            i18n.language
                          )}
                        </Badge>
                      ) : null}
                      {experience.company_url ? (
                        <a
                          href={experience.company_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-primary"
                        >
                          Company site
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {!loading && !experiences.length && !error ? (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Experience items are not available yet.
          </p>
        ) : null}

        {error ? (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
        ) : null}
      </Card>
    </MotionSection>
  );
}
