import Container from "../components/layout/Container";
import MotionSection from "../components/ui/MotionSection";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectsGrid from "../components/sections/projects/ProjectsGrid";
import Seo from "../components/ui/Seo";

export default function Projects() {
  return (
    <>
      <Seo pageKey="projects" canonicalPath="/projects" />
      <MotionSection className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title="Projects"
            subtitle="A curated selection of work that demonstrates architecture, reliability, and business value."
          />
          <ProjectsGrid />
        </Container>
      </MotionSection>
    </>
  );
}
