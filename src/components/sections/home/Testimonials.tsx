import Container from "../../layout/Container";
import SectionFX from "../../ui/SectionFX";
import SectionHeader from "../../ui/SectionHeader";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import { useTranslation } from "react-i18next";
import { testimonials } from "../../../data/testimonials";
import MotionSection from "../../ui/MotionSection";

export default function Testimonials() {
  const { t } = useTranslation();
  return (
    <MotionSection className="py-14">
      <Container>
        <SectionHeader title={t("home.testimonials.title")} subtitle={t("home.testimonials.subtitle")} />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((x) => (
            <Card key={x.id} className="p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="font-extrabold">{t(x.nameKey)}</div>
                <Badge>{t(x.roleKey)}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                “{t(x.quoteKey)}”
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}