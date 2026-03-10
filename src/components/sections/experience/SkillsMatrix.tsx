import { useMemo } from "react";
import { useSkillsQuery } from "../../../app/api/resources";
import type { SkillItem } from "../../../app/api/types";
import { getSkillPalette } from "../../../utils/skill-colors";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";
import SectionHeader from "../../ui/SectionHeader";

export default function SkillsMatrix() {
  const { data, loading, error, refetch } = useSkillsQuery();

  const grouped = useMemo(() => {
    return (data?.items || []).reduce<Record<string, SkillItem[]>>((acc, item) => {
      const key = item.category || "General";
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [data?.items]);

  return (
    <MotionSection>
      <div>
        <SectionHeader
          title="Skills"
          subtitle="The full API-driven skills list, grouped by category and rendered with the same visual color treatment."
        />

        {error ? (
          <Card className="mb-4 p-5">
            <div className="font-extrabold">Unable to load skills</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4">
              <Button onClick={refetch} variant="secondary">
                Retry
              </Button>
            </div>
          </Card>
        ) : null}

        <div className="space-y-4">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-5">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </Card>
              ))
            : Object.entries(grouped).map(([category, items]) => (
                <Card key={category} className="p-5">
                  <div className="text-lg font-extrabold">{category}</div>
                  <div className="mt-4 space-y-4">
                    {items.map((skill) => {
                      const palette = getSkillPalette(skill);
                      return (
                        <div key={skill.id}>
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">
                                {skill.title}
                              </div>
                              {skill.subtitle ? (
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {skill.subtitle}
                                </div>
                              ) : null}
                            </div>
                            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                              {skill.level_label || `${skill.percent}%`}
                            </div>
                          </div>
                          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.percent}%`,
                                background: `linear-gradient(90deg, ${palette.from}, ${palette.to})`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
        </div>

        {!loading && !Object.keys(grouped).length && !error ? (
          <Card className="p-5 text-sm text-slate-600 dark:text-slate-300">
            Skills are not available yet.
          </Card>
        ) : null}
      </div>
    </MotionSection>
  );
}
