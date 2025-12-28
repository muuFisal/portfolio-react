import Container from "../components/layout/Container";
import SectionHeader from "../components/ui/SectionHeader";
import Timeline from "../components/sections/experience/Timeline";
import SkillsMatrix from "../components/sections/experience/SkillsMatrix";
import { useTranslation } from "react-i18next";

export default function Experience() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <Container>
        <SectionHeader title={t("experience.title")} subtitle={t("experience.subtitle")} />
        <div className="grid gap-8 lg:grid-cols-2">
          <Timeline />
          <SkillsMatrix />
        </div>
      </Container>
    </div>
  );
}
