import { useTranslation } from "react-i18next";
import { useContactInfoQuery } from "../app/api/resources";
import Container from "../components/layout/Container";
import ContactCards from "../components/sections/contact/ContactCards";
import ContactForm from "../components/sections/contact/ContactForm";
import SectionHeader from "../components/ui/SectionHeader";
import Seo from "../components/ui/Seo";

export default function Contact() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useContactInfoQuery();

  return (
    <>
      <Seo
        pageKey="contact"
        title={data?.title || undefined}
        description={data?.subtitle || data?.availability || undefined}
        canonicalPath="/contact"
      />
      <div className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            title={data?.title || t("contact.title", { defaultValue: "Contact" })}
            subtitle={
              data?.subtitle ||
              t("contact.subtitle", {
                defaultValue: "Let's build something useful together.",
              })
            }
          />
          <div className="grid gap-8 lg:grid-cols-[0.92fr,1.08fr] lg:items-start">
            <ContactCards info={data || null} loading={loading} error={error} onRetry={refetch} />
            <ContactForm />
          </div>
        </Container>
      </div>
    </>
  );
}
