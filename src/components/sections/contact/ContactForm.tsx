import React from "react";
import { useTranslation } from "react-i18next";
import { useCreateContactMutation } from "../../../app/api/resources";
import type { ApiValidationErrors } from "../../../app/api/types";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service_interest: string;
  budget_range: string;
  message: string;
};

function getFirstError(errors: ApiValidationErrors | undefined, key: keyof FormState) {
  return errors?.[key]?.[0] || "";
}

export default function ContactForm() {
  const { t } = useTranslation();
  const mutation = useCreateContactMutation();
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_interest: "",
    budget_range: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "ok" | "err">("idle");
  const [fieldErrors, setFieldErrors] = React.useState<ApiValidationErrors>({});

  const onChange =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
      setFieldErrors((current) => {
        if (!current[key]) {
          return current;
        }
        const next = { ...current };
        delete next[key];
        return next;
      });
    };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("idle");
    setFieldErrors({});

    try {
      await mutation.mutateAsync({
        ...form,
        source: "portfolio-frontend",
      });
      setStatus("ok");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        service_interest: "",
        budget_range: "",
        message: "",
      });
    } catch (error) {
      const apiError = error as { validation?: ApiValidationErrors };
      setFieldErrors(apiError.validation || {});
      setStatus("err");
    }
  };

  const labelClass =
    "mb-2 flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white";
  const optionalClass =
    "text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500";
  const inputClass =
    "w-full rounded-2xl border border-slate-200/85 bg-white/92 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-primary/45 focus:ring-4 focus:ring-primary/10 dark:border-slate-800/85 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary/45 dark:focus:ring-primary/15";
  const textareaClass = `${inputClass} min-h-[158px] resize-y`;

  return (
    <MotionSection>
      <Card className="rounded-[28px] border-slate-200/80 bg-white/90 p-6 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.38)] dark:border-slate-800/80 dark:bg-slate-900/58 sm:p-7">
        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {t("contact.form.inquiryBadge", { defaultValue: "Project Inquiry" })}
          </div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t("contact.form.inquiryTitle", { defaultValue: "Tell me what you need built" })}
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {t("contact.form.inquirySubtitle", {
              defaultValue:
                "Share the problem, scope, and timeline. The form still submits through the existing API flow.",
            })}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                <span>{t("contact.form.name", { defaultValue: "Name" })}</span>
                <span className={optionalClass}>
                  {t("common.required", { defaultValue: "Required" })}
                </span>
              </label>
              <input
                value={form.name}
                onChange={onChange("name")}
                required
                className={inputClass}
                placeholder={t("contact.form.namePh", { defaultValue: "Your name" })}
              />
              {getFirstError(fieldErrors, "name") ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {getFirstError(fieldErrors, "name")}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass}>
                <span>{t("contact.form.email", { defaultValue: "Email" })}</span>
                <span className={optionalClass}>
                  {t("common.required", { defaultValue: "Required" })}
                </span>
              </label>
              <input
                value={form.email}
                onChange={onChange("email")}
                type="email"
                required
                className={inputClass}
                placeholder={t("contact.form.emailBusinessPh", {
                  defaultValue: "name@company.com",
                })}
              />
              {getFirstError(fieldErrors, "email") ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {getFirstError(fieldErrors, "email")}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                <span>{t("contact.form.phone", { defaultValue: "Phone" })}</span>
                <span className={optionalClass}>
                  {t("common.optional", { defaultValue: "Optional" })}
                </span>
              </label>
              <input
                value={form.phone}
                onChange={onChange("phone")}
                className={inputClass}
                placeholder={t("contact.form.phoneIntlPh", { defaultValue: "+20 ..." })}
              />
              {getFirstError(fieldErrors, "phone") ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {getFirstError(fieldErrors, "phone")}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass}>
                <span>{t("contact.form.company", { defaultValue: "Company" })}</span>
                <span className={optionalClass}>
                  {t("common.optional", { defaultValue: "Optional" })}
                </span>
              </label>
              <input
                value={form.company}
                onChange={onChange("company")}
                className={inputClass}
                placeholder={t("contact.form.companyPh", {
                  defaultValue: "Your company or team",
                })}
              />
              {getFirstError(fieldErrors, "company") ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {getFirstError(fieldErrors, "company")}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                <span>
                  {t("contact.form.serviceInterest", { defaultValue: "Service Interest" })}
                </span>
                <span className={optionalClass}>
                  {t("common.optional", { defaultValue: "Optional" })}
                </span>
              </label>
              <input
                value={form.service_interest}
                onChange={onChange("service_interest")}
                className={inputClass}
                placeholder={t("contact.form.serviceInterestPh", {
                  defaultValue: "API integration, dashboard, website",
                })}
              />
              {getFirstError(fieldErrors, "service_interest") ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {getFirstError(fieldErrors, "service_interest")}
                </p>
              ) : null}
            </div>

            <div>
              <label className={labelClass}>
                <span>{t("contact.form.budgetRange", { defaultValue: "Budget Range" })}</span>
                <span className={optionalClass}>
                  {t("common.optional", { defaultValue: "Optional" })}
                </span>
              </label>
              <select
                value={form.budget_range}
                onChange={onChange("budget_range")}
                className={inputClass}
              >
                <option value="">
                  {t("contact.form.budgetRangeSelect", {
                    defaultValue: "Select a range",
                  })}
                </option>
                <option value="under_1k">
                  {t("contact.form.budgetRanges.under1k", { defaultValue: "Under $1k" })}
                </option>
                <option value="1k_5k">
                  {t("contact.form.budgetRanges.from1kTo5k", {
                    defaultValue: "$1k - $5k",
                  })}
                </option>
                <option value="5k_10k">
                  {t("contact.form.budgetRanges.from5kTo10k", {
                    defaultValue: "$5k - $10k",
                  })}
                </option>
                <option value="10k_plus">
                  {t("contact.form.budgetRanges.over10k", { defaultValue: "$10k+" })}
                </option>
              </select>
              {getFirstError(fieldErrors, "budget_range") ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {getFirstError(fieldErrors, "budget_range")}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label className={labelClass}>
              <span>{t("contact.form.message", { defaultValue: "Message" })}</span>
              <span className={optionalClass}>
                {t("common.required", { defaultValue: "Required" })}
              </span>
            </label>
            <textarea
              value={form.message}
              onChange={onChange("message")}
              required
              className={textareaClass}
              placeholder={t("contact.form.msgPh", {
                defaultValue: "Tell me what you want to build, the timeline, and any constraints.",
              })}
            />
            {getFirstError(fieldErrors, "message") ? (
              <p className="mt-2 text-xs font-semibold text-rose-600">
                {getFirstError(fieldErrors, "message")}
              </p>
            ) : null}
          </div>

          <Button
            disabled={mutation.loading}
            className="w-full rounded-2xl py-3 shadow-[0_20px_40px_-20px_rgba(99,102,241,0.65)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {mutation.loading
              ? t("contact.form.sending", { defaultValue: "Sending..." })
              : t("contact.form.send", { defaultValue: "Send message" })}
          </Button>

          {status === "ok" ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
              {t("contact.form.sent", {
                defaultValue: "Message sent successfully. I'll get back to you soon.",
              })}
            </p>
          ) : null}

          {status === "err" && mutation.error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200">
              {mutation.error.message}
            </p>
          ) : null}

          <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
            {t("contact.form.note", {
              defaultValue:
                "By sending this message, you agree that I can contact you back using the provided details.",
            })}
          </p>
        </form>
      </Card>
    </MotionSection>
  );
}
