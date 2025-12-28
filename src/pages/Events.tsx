import Container from "../components/layout/Container";
import SectionHeader from "../components/ui/SectionHeader";
import EventsList from "../components/sections/events/EventsList";
import { useTranslation } from "react-i18next";

export default function Events() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <Container>
        <SectionHeader title={t("events.title")} subtitle={t("events.subtitle")} />
        <EventsList />
      </Container>
    </div>
  );
}
