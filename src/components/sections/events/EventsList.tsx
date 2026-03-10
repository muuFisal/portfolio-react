import { useTranslation } from "react-i18next";
import { useEventsQuery } from "../../../app/api/resources";
import { formatDate } from "../../../utils/portfolio";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";

export default function EventsList() {
  const { i18n } = useTranslation();
  const { data, loading, error, refetch } = useEventsQuery();
  const events = data?.items || [];

  return (
    <MotionSection>
      <div className="grid gap-5 md:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </Card>
            ))
          : events.map((event) => (
              <Card key={event.id} className="overflow-hidden p-0">
                {event.cover_image_url ? (
                  <img
                    src={event.cover_image_url}
                    alt={event.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-extrabold">{event.title}</div>
                      {event.type ? (
                        <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                          {event.type}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {event.date ? <Badge>{formatDate(event.date, i18n.language)}</Badge> : null}
                      {event.featured ? <Badge>Featured</Badge> : null}
                    </div>
                  </div>

                  {event.description ? (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                      {event.description}
                    </p>
                  ) : null}

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {event.location || "Remote"}
                    </span>
                    {event.url ? (
                      <a href={event.url} target="_blank" rel="noreferrer">
                        <Button className="px-3 py-2" variant="secondary">
                          Open
                        </Button>
                      </a>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
      </div>

      {!loading && !events.length && !error ? (
        <Card className="mt-5 p-5 text-sm text-slate-600 dark:text-slate-300">
          No events are available yet.
        </Card>
      ) : null}

      {error ? (
        <div className="mt-5">
          <Card className="p-5">
            <div className="font-extrabold">Unable to load events</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4">
              <Button onClick={refetch} variant="secondary">
                Retry
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </MotionSection>
  );
}
