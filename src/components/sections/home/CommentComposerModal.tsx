import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { useCreateCommentMutation } from "../../../app/api/resources";
import type { ApiValidationErrors } from "../../../app/api/types";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

type CommentFormState = {
  name: string;
  email: string;
  role: string;
  comment: string;
  rating: string;
  source: string;
  avatar: File | null;
};

function getFirstError(errors: ApiValidationErrors | undefined, key: keyof CommentFormState | "avatar") {
  return errors?.[key]?.[0] || "";
}

export default function CommentComposerModal({
  open,
  onClose,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const { t } = useTranslation();
  const mutation = useCreateCommentMutation();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<ApiValidationErrors>({});
  const [form, setForm] = React.useState<CommentFormState>({
    name: "",
    email: "",
    role: "",
    comment: "",
    rating: "",
    source: "portfolio-home",
    avatar: null,
  });

  React.useEffect(() => {
    if (!open) {
      setFieldErrors({});
    }
  }, [open]);

  const onChange =
    (key: keyof CommentFormState) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const value = event.target.value;
      setForm((current) => ({ ...current, [key]: value }));
      setFieldErrors((current) => {
        if (!current[key]) {
          return current;
        }
        const next = { ...current };
        delete next[key];
        return next;
      });
    };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setForm((current) => ({ ...current, avatar: file }));
  };

  const resetForm = React.useCallback(() => {
    setForm({
      name: "",
      email: "",
      role: "",
      comment: "",
      rating: "",
      source: "portfolio-home",
      avatar: null,
    });
    setFieldErrors({});
    mutation.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [mutation]);

  const handleClose = () => {
    if (!mutation.loading) {
      onClose();
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFieldErrors({});

    try {
      await mutation.mutateAsync({
        name: form.name,
        email: form.email,
        role: form.role || undefined,
        comment: form.comment,
        rating: form.rating ? Number(form.rating) : null,
        avatar: form.avatar,
        source: form.source,
      });
      resetForm();
      onSubmitted();
      onClose();
    } catch (error) {
      const apiError = error as { validation?: ApiValidationErrors };
      setFieldErrors(apiError.validation || {});
    }
  };

  const labelClass =
    "mb-2 flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white";
  const optionalClass =
    "text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500";
  const inputClass =
    "w-full rounded-2xl border border-slate-200/85 bg-white/92 px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-primary/45 focus:ring-4 focus:ring-primary/10 dark:border-slate-800/85 dark:bg-slate-950/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary/45 dark:focus:ring-primary/15";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t("home.comments.modal.title", { defaultValue: "Leave a Comment" })}
      subtitle={t("home.comments.modal.subtitle", {
        defaultValue: "Share a short note about working together. Submissions are sent to the existing API and appear after approval.",
      })}
      panelClassName="max-w-3xl"
    >
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
              placeholder={t("contact.form.emailPh", { defaultValue: "Your email" })}
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
              <span>{t("home.comments.modal.role", { defaultValue: "Role" })}</span>
              <span className={optionalClass}>
                {t("common.optional", { defaultValue: "Optional" })}
              </span>
            </label>
            <input
              value={form.role}
              onChange={onChange("role")}
              className={inputClass}
              placeholder={t("home.comments.modal.rolePlaceholder", {
                defaultValue: "Founder, designer, engineer",
              })}
            />
            {getFirstError(fieldErrors, "role") ? (
              <p className="mt-2 text-xs font-semibold text-rose-600">
                {getFirstError(fieldErrors, "role")}
              </p>
            ) : null}
          </div>

          <div>
            <label className={labelClass}>
              <span>{t("home.comments.modal.rating", { defaultValue: "Rating" })}</span>
              <span className={optionalClass}>
                {t("common.optional", { defaultValue: "Optional" })}
              </span>
            </label>
            <div className="relative">
              <select
                value={form.rating}
                onChange={onChange("rating")}
                className={`${inputClass} appearance-none pr-12`}
              >
                <option value="">
                  {t("home.comments.modal.ratingPlaceholder", {
                    defaultValue: "Select a rating",
                  })}
                </option>
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <FaStar className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-amber-400" />
            </div>
            {getFirstError(fieldErrors, "rating") ? (
              <p className="mt-2 text-xs font-semibold text-rose-600">
                {getFirstError(fieldErrors, "rating")}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label className={labelClass}>
            <span>{t("home.comments.modal.comment", { defaultValue: "Comment" })}</span>
            <span className={optionalClass}>
              {t("common.required", { defaultValue: "Required" })}
            </span>
          </label>
          <textarea
            value={form.comment}
            onChange={onChange("comment")}
            required
            className={`${inputClass} min-h-[164px] resize-y`}
            placeholder={t("home.comments.modal.commentPlaceholder", {
              defaultValue: "Share your experience working together.",
            })}
          />
          {getFirstError(fieldErrors, "comment") ? (
            <p className="mt-2 text-xs font-semibold text-rose-600">
              {getFirstError(fieldErrors, "comment")}
            </p>
          ) : null}
        </div>

        <div>
          <label className={labelClass}>
            <span>{t("home.comments.modal.avatar", { defaultValue: "Avatar" })}</span>
            <span className={optionalClass}>
              {t("common.optional", { defaultValue: "Optional" })}
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-300/90 bg-slate-50/80 px-4 py-4 text-sm text-slate-600 transition hover:border-primary/45 hover:bg-white dark:border-slate-700/90 dark:bg-slate-900/55 dark:text-slate-300 dark:hover:border-primary/45">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FaCloudUploadAlt className="text-base" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-900 dark:text-white">
                {form.avatar?.name || t("home.comments.modal.avatarPlaceholder", { defaultValue: "Upload an optional image" })}
              </span>
              <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                {t("home.comments.modal.fileHint", {
                  defaultValue: "PNG, JPG, or WebP up to 4MB",
                })}
              </span>
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </label>
          {getFirstError(fieldErrors, "avatar") ? (
            <p className="mt-2 text-xs font-semibold text-rose-600">
              {getFirstError(fieldErrors, "avatar")}
            </p>
          ) : null}
        </div>

        {mutation.error && !Object.keys(fieldErrors).length ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-200">
            {mutation.error.message}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FaCheckCircle className="text-emerald-500" />
            <span>
              {t("home.comments.modal.privacy", {
                defaultValue: "Comments are reviewed before appearing publicly.",
              })}
            </span>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="ghost" className="rounded-2xl px-4 py-2.5" onClick={handleClose}>
              {t("common.close", { defaultValue: "Close" })}
            </Button>
            <Button
              disabled={mutation.loading}
              className="rounded-2xl px-5 py-2.5 shadow-[0_20px_40px_-22px_rgba(99,102,241,0.65)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {mutation.loading
                ? t("common.loading", { defaultValue: "Loading..." })
                : t("home.comments.modal.submit", { defaultValue: "Submit Comment" })}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
