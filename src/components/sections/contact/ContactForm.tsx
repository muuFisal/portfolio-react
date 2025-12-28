import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { useTranslation } from "react-i18next";
import React from "react";
import MotionSection from "../../ui/MotionSection";

export default function ContactForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

  return (
    <MotionSection>
      <Card className="p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-bold">{t("contact.form.name")}</label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
            placeholder={t("contact.form.namePh")}
          />
        </div>

        <div>
          <label className="text-sm font-bold">{t("contact.form.email")}</label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
            placeholder={t("contact.form.emailPh")}
          />
        </div>

        <div>
          <label className="text-sm font-bold">{t("contact.form.message")}</label>
          <textarea
            className="mt-2 min-h-[140px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
            placeholder={t("contact.form.msgPh")}
          />
        </div>

        <Button disabled={loading} className="w-full">
          {loading ? t("common.loading") : t("contact.form.send")}
        </Button>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t("contact.form.note")}
        </p>
      </form>
    </Card>
    </MotionSection>

  );
}