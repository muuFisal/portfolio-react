import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import { events } from "../../../data/events";
import { useTranslation } from "react-i18next";
import MotionSection from "../../ui/MotionSection";

const typeColor = (type: string) => {
  if (type === "Release") return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900";
  if (type === "Talk") return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-900";
  return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-800";
};

export default function EventsList() {
  const { t } = useTranslation();
  return (
    <MotionSection>
      <div className="grid gap-5 md:grid-cols-2">
      {events.map((e) => (
        <Card key={e.id} className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-extrabold">{t(e.titleKey)}</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t(e.descKey)}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge>{e.year}</Badge>
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${typeColor(e.type)}`}>
                {e.type}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
    </MotionSection>

  );
}