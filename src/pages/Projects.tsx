import Container from "../components/layout/Container";
import MotionSection from "../components/ui/MotionSection";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectsGrid from "../components/sections/projects/ProjectsGrid";
import { useTranslation } from "react-i18next";
import Seo from "../components/ui/Seo";

export default function Projects() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title={`${t("projects.title", { defaultValue: "Projects" })} | Mohamed Fisal`}
        description={t("projects.subtitle", { defaultValue: "A curated selection of work that demonstrates architecture, reliability, and business value." })}
        canonicalPath="/projects"
      />
      <MotionSection className="py-16 sm:py-20">
        <Container>
          <SectionHeader title={t("projects.title")} subtitle={t("projects.subtitle")} />
          <ProjectsGrid />
        </Container>
      </MotionSection>
    </>
  );
}
