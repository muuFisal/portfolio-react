import { useTranslation } from "react-i18next";
import Container from "../../layout/Container";
import MotionSection from "../../ui/MotionSection";
import SectionHeader from "../../ui/SectionHeader";
import Card from "../../ui/Card";

export default function ProcessSection() {
  const { t } = useTranslation();

  const STEPS = [
    { n: "01", title: t("home.process.s1t", "Discovery & domain mapping"), desc: t("home.process.s1d", "I start from product logic, business constraints, and data flow before touching implementation.") },
    { n: "02", title: t("home.process.s2t", "Architecture & implementation"), desc: t("home.process.s2d", "I design modules, APIs, permissions, and edge cases with maintainability and scalability in mind.") },
    { n: "03", title: t("home.process.s3t", "Production hardening"), desc: t("home.process.s3d", "I care about logs, validation, idempotency, retries, UX polish, and clean handoff for the team.") },
  ];

  return (
    <MotionSection className="py-16">
      <Container>
        <SectionHeader
          title={t("home.process.title", { defaultValue: "How I work" })}
          subtitle={t("home.process.subtitle", { defaultValue: "A practical approach focused on shipping business-ready systems, not just screens." })}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {STEPS.map((step) => (
            <Card key={step.n} className="p-6">
              <div className="text-sm font-extrabold text-primary">{step.n}</div>
              <h3 className="mt-3 text-xl font-extrabold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}
