import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import { useTranslation } from "react-i18next";
import MotionSection from "../../ui/MotionSection";

type Item = {
  year: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
};

const items: Item[] = [
  { year: "2025", titleKey: "experience.timeline.i1t", descKey: "experience.timeline.i1d", tagKey: "experience.timeline.i1tag" },
  { year: "2025", titleKey: "experience.timeline.i2t", descKey: "experience.timeline.i2d", tagKey: "experience.timeline.i2tag" },
  { year: "2024", titleKey: "experience.timeline.i3t", descKey: "experience.timeline.i3d", tagKey: "experience.timeline.i3tag" }
];

export default function Timeline() {
  const { t } = useTranslation();
  return (
    <MotionSection>
      <div className="space-y-4">
      {items.map((it) => (
        <Card key={it.titleKey} className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="font-extrabold">{t(it.titleKey)}</div>
            <Badge>{it.year}</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t(it.descKey)}</p>
          <div className="mt-3">
            <Badge>{t(it.tagKey)}</Badge>
          </div>
        </Card>
      ))}
    </div>
    </MotionSection>

  );
}