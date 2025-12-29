import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import MotionSection from "../../ui/MotionSection";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Experience } from "../../../app/api/resources";

function fmtRange(start?: string, end?: string, current?: boolean) {
  const s = start ? String(start).slice(0, 10) : "";
  const e = current ? "Present" : end ? String(end).slice(0, 10) : "";
  return [s, e].filter(Boolean).join(" • ");
}

export default function Timeline({
  experiences,
  loading,
  error,
  onRetry,
}: {
  experiences: Experience[];
  loading: boolean;
  error: { message: string } | null;
  onRetry: () => void;
}) {
  const { t, i18n } = useTranslation();

  return (
    <MotionSection>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold">{t("experience.timeline")}</h3>
          {error ? (
            <Button onClick={onRetry} variant="secondary" className="px-3 py-2">
              {t("common.retry")}
            </Button>
          ) : null}
        </div>

        <div className="mt-5 space-y-4">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              ))
            : experiences.map((e, idx) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-extrabold">{e.title}</div>
                      {(e.company || e.location) ? (
                        <div className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {[e.company, e.location].filter(Boolean).join(" • ")}
                        </div>
                      ) : null}

                      {e.description ? (
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                          {e.description}
                        </p>
                      ) : null}

                      {(e.tags || []).length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {e.tags!.slice(0, 6).map((tg) => (
                            <Badge key={tg}>{tg}</Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {fmtRange(e.start_date, e.end_date, e.is_current) ? (
                        <Badge>{fmtRange(e.start_date, e.end_date, e.is_current)}</Badge>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {error ? (
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
        ) : null}
      </Card>
    </MotionSection>
  );
}
