import Card from "../../ui/Card";
import { useTranslation } from "react-i18next";
import { meta } from "../../../data/meta";
import MotionSection from "../../ui/MotionSection";

export default function ContactCards() {
  const { t } = useTranslation();

  const items = [
    { k: t("contact.cards.email"), v: meta.email },
    { k: t("contact.cards.whatsapp"), v: meta.whatsapp },
    { k: t("contact.cards.linkedin"), v: meta.linkedin.replace("https://", "") },
    { k: t("contact.cards.github"), v: meta.github.replace("https://", "") }
  ];

  return (
    <MotionSection>
      <div className="grid gap-4">
      {items.map((it) => (
        <Card key={it.k} className="p-5">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-300">{it.k}</div>
          <div className="mt-2 font-extrabold">{it.v}</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("contact.cards.hint")}</div>
        </Card>
      ))}
    </div>
    </MotionSection>

  );
}