import { useTranslation } from "react-i18next";
import MotionSection from "../../ui/MotionSection";
import Container from "../../layout/Container";

export default function ExpertiseStrip() {
  const { t } = useTranslation();

  const ITEMS = [
    t("home.expertise.e1", "ERP & CRM Systems"),
    t("home.expertise.e2", "Payment Gateways"),
    t("home.expertise.e3", "Wallet Architecture"),
    t("home.expertise.e4", "Multilingual Dashboards"),
    t("home.expertise.e5", "React Frontends"),
    t("home.expertise.e6", "Webhook Automation"),
    t("home.expertise.e7", "Performance & DX"),
    t("home.expertise.e8", "Clean Laravel Architecture"),
  ];

  return (
    <MotionSection className="py-4">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            {ITEMS.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold tracking-wide text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
