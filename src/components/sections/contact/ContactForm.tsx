import React from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import MotionSection from "../../ui/MotionSection";
import { useTranslation } from "react-i18next";
import { apiRequest } from "../../../app/api/client";
import { useApiLoading } from "../../../app/api/loading";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const { t } = useTranslation();
  const { start, stop } = useApiLoading();
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = React.useState<string>("");

  const onChange = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [k]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrMsg("");
    setLoading(true);
    start();

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("subject", form.subject);
      fd.append("message", form.message);
      fd.append("source", "portfolio_web");

      await apiRequest("/contact", {
        method: "POST",
        body: fd,
          email: form.email,
          });

      setStatus("ok");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("err");
      setErrMsg(err?.message || t("common.error"));
    } finally {
      setLoading(false);
      stop();
    }
  };

  return (
    <MotionSection>
      <Card className="p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-bold">{t("contact.form.name")}</label>
              <input
                value={form.name}
                onChange={onChange("name")}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
                placeholder={t("contact.form.namePh")}
              />
            </div>

            <div>
              <label className="text-sm font-bold">{t("contact.form.email")}</label>
              <input
                value={form.email}
                onChange={onChange("email")}
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
                placeholder={t("contact.form.emailPh")}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-bold">{t("contact.form.phone")}</label>
              <input
                value={form.phone}
                onChange={onChange("phone")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
                placeholder={t("contact.form.phonePh")}
              />
            </div>

            <div>
              <label className="text-sm font-bold">{t("contact.form.subject")}</label>
              <input
                value={form.subject}
                onChange={onChange("subject")}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
                placeholder={t("contact.form.subjectPh")}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold">{t("contact.form.message")}</label>
            <textarea
              value={form.message}
              onChange={onChange("message")}
              required
              className="mt-2 min-h-[140px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950"
              placeholder={t("contact.form.msgPh")}
            />
          </div>

          <Button disabled={loading} className="w-full">
            {loading ? t("common.loading") : t("contact.form.send")}
          </Button>

          {status === "ok" ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
              {t("contact.form.sent")}
            </p>
          ) : null}

          {status === "err" ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200">
              {errMsg}
            </p>
          ) : null}

          <p className="text-xs text-slate-500 dark:text-slate-400">{t("contact.form.note")}</p>
        </form>
      </Card>
    </MotionSection>
  );
}
