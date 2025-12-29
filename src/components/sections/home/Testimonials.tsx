import Container from "../../layout/Container";
import SectionFX from "../../ui/SectionFX";
import SectionHeader from "../../ui/SectionHeader";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import { useTranslation } from "react-i18next";
import { testimonials } from "../../../data/testimonials";
import { useTestimonials } from "../../../app/api/resources";
import MotionSection from "../../ui/MotionSection";

export default function Testimonials() {
  const { t } = useTranslation();
  const { data: apiTestimonials } = useTestimonials();

  const list = (apiTestimonials && apiTestimonials.length)
    ? apiTestimonials.map((x) => ({
        id: x.id,
        name: x.name,
        badge: x.badge ?? "",
        quote: x.quote,
      }))
    : testimonials.map((x) => ({
        id: x.id,
        name: t(x.nameKey),
        badge: t(x.roleKey),
        quote: t(x.quoteKey),
      }));
  return (
    <MotionSection className="py-14">
      <Container>
        <SectionHeader title={t("home.testimonials.title")} subtitle={t("home.testimonials.subtitle")} />
        <div className="grid gap-5 md:grid-cols-3">
          {list.map((x) => (
            <Card key={x.id} className="p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="font-extrabold">{x.name}</div>
                {x.badge ? <Badge>{x.badge}</Badge> : null}
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                “{x.quote}”
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}