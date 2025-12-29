import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../../app/settings/context";

function cleanHost(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function ContactCards() {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const items = [
    settings?.email
      ? { k: t("contact.cards.email"), v: settings.email, href: `mailto:${settings.email}` }
      : null,
    settings?.whatsapp
      ? { k: t("contact.cards.whatsapp"), v: settings.whatsapp, href: settings.whatsapp }
      : null,
    settings?.linkedin
      ? { k: t("contact.cards.linkedin"), v: cleanHost(settings.linkedin), href: settings.linkedin }
      : null,
    settings?.github
      ? { k: t("contact.cards.github"), v: cleanHost(settings.github), href: settings.github }
      : null,
  ].filter(Boolean) as Array<{ k: string; v: string; href: string }>;

  if (!items.length) return null;

  return (
    <MotionSection>
      <div className="grid gap-4">
        {items.map((it) => (
          <Card key={it.k} className="p-5">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-300">{it.k}</div>
            <a
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all font-extrabold hover:underline"
            >
              {it.v}
            </a>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t("contact.cards.hint")}</div>
          </Card>
        ))}
      </div>
    </MotionSection>
  );
}
