import Container from "../components/layout/Container";
import EventsList from "../components/sections/events/EventsList";
import SectionHeader from "../components/ui/SectionHeader";
import Seo from "../components/ui/Seo";

export default function Events() {
  return (
    <>
      <Seo pageKey="events" canonicalPath="/events" />
      <div className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title="Events & Milestones"
            subtitle="Releases, launches, and public milestones pulled directly from the API."
          />
          <EventsList />
        </Container>
      </div>
    </>
  );
}
