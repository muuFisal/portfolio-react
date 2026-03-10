import { useExperiencesQuery } from "../app/api/resources";
import Container from "../components/layout/Container";
import Timeline from "../components/sections/experience/Timeline";
import SkillsMatrix from "../components/sections/experience/SkillsMatrix";
import SectionHeader from "../components/ui/SectionHeader";
import Seo from "../components/ui/Seo";

export default function Experience() {
  const { data, loading, error, refetch } = useExperiencesQuery();

  return (
    <>
      <Seo pageKey="experience" canonicalPath="/experience" />
      <div className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title="Experience"
            subtitle="Career history, responsibilities, and the skills behind the shipped work."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <Timeline
              experiences={data?.items || []}
              loading={loading}
              error={error}
              onRetry={refetch}
            />
            <SkillsMatrix />
          </div>
        </Container>
      </div>
    </>
  );
}
