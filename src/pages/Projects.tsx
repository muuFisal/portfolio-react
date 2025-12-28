import Container from "../components/layout/Container";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectsGrid from "../components/sections/projects/ProjectsGrid";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <Container>
        <SectionHeader title={t("projects.title")} subtitle={t("projects.subtitle")} />
        <ProjectsGrid />
      </Container>
    </div>
  );
}
