import Container from "../components/layout/Container";
import SectionHeader from "../components/ui/SectionHeader";
import ContactCards from "../components/sections/contact/ContactCards";
import ContactForm from "../components/sections/contact/ContactForm";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <Container>
        <SectionHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />
        <div className="grid gap-6 lg:grid-cols-2">
          <ContactCards />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
