import Card from "../../ui/Card";
import SectionHeader from "../../ui/SectionHeader";
import { useTranslation } from "react-i18next";
import Badge from "../../ui/Badge";
import MotionSection from "../../ui/MotionSection";

type Row = { areaKey: string; pointsKey: string[] };

const rows: Row[] = [
  { areaKey: "experience.matrix.arch", pointsKey: ["experience.matrix.arch1", "experience.matrix.arch2", "experience.matrix.arch3"] },
  { areaKey: "experience.matrix.pay", pointsKey: ["experience.matrix.pay1", "experience.matrix.pay2", "experience.matrix.pay3"] },
  { areaKey: "experience.matrix.ops", pointsKey: ["experience.matrix.ops1", "experience.matrix.ops2", "experience.matrix.ops3"] }
];

export default function SkillsMatrix() {
  const { t } = useTranslation();
  return (
    <MotionSection>
      <div>
      <SectionHeader title={t("experience.matrix.title")} subtitle={t("experience.matrix.subtitle")} />
      <div className="space-y-4">
        {rows.map((r) => (
          <Card key={r.areaKey} className="p-5">
            <div className="text-lg font-extrabold">{t(r.areaKey)}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {r.pointsKey.map((k) => (
                <li key={k} className="flex gap-2">
                  <span>•</span><span>{t(k)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{t("experience.matrix.tagQuality")}</Badge>
              <Badge>{t("experience.matrix.tagScale")}</Badge>
              <Badge>{t("experience.matrix.tagSecurity")}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </MotionSection>

  );
}