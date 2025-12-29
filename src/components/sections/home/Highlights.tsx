import Container from "../../layout/Container";
import Card from "../../ui/Card";
import SectionHeader from "../../ui/SectionHeader";
import { useTranslation } from "react-i18next";
import MotionSection from "../../ui/MotionSection";
import { useAchievements } from "../../../app/api/resources";

export default function Highlights() {
  const { t } = useTranslation();
  const { data } = useAchievements();

  // Fallback items (what the UI was originally designed for)
  const fallback = [
    { title: t("home.highlights.i1t"), desc: t("home.highlights.i1d"), icon: "🏗️" },
    { title: t("home.highlights.i2t"), desc: t("home.highlights.i2d"), icon: "💳" },
    { title: t("home.highlights.i3t"), desc: t("home.highlights.i3d"), icon: "🌍" },
    { title: t("home.highlights.i4t"), desc: t("home.highlights.i4d"), icon: "⚡" }
  ];

  // Deterministic icons if backend doesn't provide icons (keeps cards visually distinct)
  const iconsByIndex = ["🏗️", "💳", "🌍", "⚡"]; 

  const apiItems = (data && data.length)
    ? data.slice(0, 4).map((a, idx) => ({
        title: a.title,
        desc: a.description || "",
        value: (a as any).value,
        unit: (a as any).unit,
        icon: (a as any).icon || iconsByIndex[idx] || "✨",
      }))
    : [];

  // Always render 4 cards. If API returns less than 4, fill the rest from fallback.
  const items = [...apiItems, ...fallback].slice(0, 4);

  return (
    <MotionSection className="py-14">
      <Container>
        <SectionHeader title={t("home.highlights.title")} subtitle={t("home.highlights.subtitle")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Card key={it.title} className="p-5">
              <div className="text-2xl">{it.icon}</div>
              <div className="mt-3 text-lg font-extrabold">{it.title}</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{it.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}