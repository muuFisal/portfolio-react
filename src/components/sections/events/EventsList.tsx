import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import MotionSection from "../../ui/MotionSection";
import { useEvents } from "../../../app/api/resources";
import { useTranslation } from "react-i18next";

function yearFromDate(d?: string) {
  if (!d) return "";
  const y = String(d).slice(0, 4);
  return /^\d{4}$/.test(y) ? y : "";
}

export default function EventsList() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useEvents();
  const events = data || [];

  return (
    <MotionSection>
      <div className="grid gap-5 md:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Card key={idx} className="p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </Card>
            ))
          : events.map((e) => (
              <Card key={e.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-extrabold">{e.title}</div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {e.description || ""}
                    </p>
                    {e.location ? (
                      <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {e.location}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {e.date ? <Badge>{yearFromDate(e.date) || e.date}</Badge> : null}
                    {e.link ? (
                      <a href={e.link} target="_blank" rel="noreferrer">
                        <Button className="px-3 py-2" variant="secondary">
                          {t("events.open")}
                        </Button>
                      </a>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
      </div>

      {error ? (
        <div className="mt-5">
          <Card className="p-5">
            <div className="font-extrabold">{t("common.error")}</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4">
              <Button onClick={refetch} variant="secondary">
                {t("common.retry")}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </MotionSection>
  );
}
