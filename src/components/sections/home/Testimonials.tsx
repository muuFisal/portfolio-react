import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaQuoteRight, FaStar } from "react-icons/fa";
import { useCommentsQuery, useTestimonialsQuery } from "../../../app/api/resources";
import { formatDate } from "../../../utils/portfolio";
import CommentComposerModal from "./CommentComposerModal";
import Container from "../../layout/Container";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";
import Pagination from "../../ui/Pagination";
import SectionHeader from "../../ui/SectionHeader";

function RatingRow({
  rating,
  muted = false,
}: {
  rating: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <FaStar
          key={index}
          className={muted ? "text-[11px] text-amber-400/80" : "text-[11px] text-amber-400"}
        />
      ))}
    </div>
  );
}

function Avatar({
  name,
  avatarUrl,
  tone = "primary",
}: {
  name: string;
  avatarUrl?: string | null;
  tone?: "primary" | "secondary";
}) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="h-12 w-12 rounded-2xl object-cover ring-1 ring-slate-200/70 dark:ring-slate-800/70"
      />
    );
  }

  return (
    <div
      className={[
        "flex h-12 w-12 items-center justify-center rounded-2xl font-extrabold",
        tone === "secondary"
          ? "bg-secondary/12 text-secondary"
          : "bg-primary/12 text-primary",
      ].join(" ")}
    >
      {name.charAt(0)}
    </div>
  );
}

function FeedbackCard({
  name,
  avatarUrl,
  meta,
  quote,
  rating,
  accent = "primary",
  trailing,
}: {
  name: string;
  avatarUrl?: string | null;
  meta?: string;
  quote: string;
  rating?: number;
  accent?: "primary" | "secondary";
  trailing?: React.ReactNode;
}) {
  return (
    <Card className="group relative overflow-hidden rounded-[28px] border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.34)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_85px_-42px_rgba(15,23,42,0.42)] dark:border-slate-800/80 dark:bg-slate-900/55">
      <div
        className={[
          "pointer-events-none absolute inset-x-0 top-0 h-20 opacity-70",
          accent === "secondary"
            ? "bg-gradient-to-b from-secondary/10 to-transparent"
            : "bg-gradient-to-b from-primary/10 to-transparent",
        ].join(" ")}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={name} avatarUrl={avatarUrl} tone={accent} />
            <div className="min-w-0">
              <div className="truncate text-base font-extrabold text-slate-900 dark:text-white">
                {name}
              </div>
              {meta ? (
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{meta}</div>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 items-start gap-3">
            {trailing ? <div className="text-right text-xs text-slate-400">{trailing}</div> : null}
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-2xl",
                accent === "secondary"
                  ? "bg-secondary/10 text-secondary"
                  : "bg-primary/10 text-primary",
              ].join(" ")}
            >
              <FaQuoteRight className="text-sm" />
            </div>
          </div>
        </div>

        {rating ? (
          <div className="mt-5">
            <RatingRow rating={rating} muted={accent === "secondary"} />
          </div>
        ) : null}

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{quote}</p>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const testimonialsQuery = useTestimonialsQuery();
  const [page, setPage] = React.useState(1);
  const commentsQuery = useCommentsQuery({ page, per_page: 4 });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);

  React.useEffect(() => {
    if (!toastOpen) {
      return;
    }

    const timer = window.setTimeout(() => setToastOpen(false), 3400);
    return () => window.clearTimeout(timer);
  }, [toastOpen]);

  const testimonials = testimonialsQuery.data?.items || [];
  const comments = commentsQuery.data?.items || [];

  const handleSubmitted = () => {
    setToastOpen(true);
    commentsQuery.refetch();
  };

  return (
    <MotionSection className="py-14">
      <AnimatePresence>
        {toastOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-[75] w-[calc(100vw-2.5rem)] max-w-sm rounded-[26px] border border-emerald-200/80 bg-white/96 p-4 shadow-[0_28px_80px_-38px_rgba(16,185,129,0.35)] dark:border-emerald-900/80 dark:bg-slate-950/94"
          >
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0.7, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/45 dark:text-emerald-300"
              >
                <FaCheckCircle className="text-lg" />
              </motion.div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {t("home.comments.toast.title", { defaultValue: "Comment submitted" })}
                </div>
                <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t("home.comments.toast.body", {
                    defaultValue: "Thanks. Your comment was sent successfully and will appear after approval.",
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Container>
        <SectionHeader
          title={t("home.testimonials.title", { defaultValue: "Testimonials" })}
          subtitle={t("home.testimonials.subtitle", {
            defaultValue: "Client feedback and approved public comments sourced from the API.",
          })}
        />

        {testimonialsQuery.error ? (
          <Card className="mb-5 rounded-[24px] p-5">
            <div className="font-extrabold">
              {t("home.testimonials.loadError", {
                defaultValue: "Unable to load testimonials",
              })}
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {testimonialsQuery.error.message}
            </p>
          </Card>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonialsQuery.loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="rounded-[28px] p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                  <div className="mt-5 h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="mt-2 h-4 w-11/12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </Card>
              ))
            : testimonials.map((item) => (
                <FeedbackCard
                  key={item.id}
                  name={item.name}
                  avatarUrl={item.avatar_url}
                  meta={[item.role, item.company, item.badge].filter(Boolean).join(" / ")}
                  quote={item.quote}
                  rating={5}
                  accent="primary"
                />
              ))}
        </div>

        {!testimonialsQuery.loading && !testimonials.length && !testimonialsQuery.error ? (
          <Card className="mt-5 rounded-[24px] p-5 text-sm text-slate-600 dark:text-slate-300">
            {t("home.testimonials.none", {
              defaultValue: "No testimonials are available yet.",
            })}
          </Card>
        ) : null}

        <Card className="mt-8 rounded-[30px] border-slate-200/80 bg-gradient-to-br from-primary/8 via-white/95 to-secondary/8 p-6 shadow-[0_26px_70px_-42px_rgba(15,23,42,0.34)] dark:border-slate-800/80 dark:from-primary/10 dark:via-slate-950/92 dark:to-secondary/10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {t("home.comments.ctaLabel", { defaultValue: "Public Feedback" })}
                </div>
                <div className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                  {t("home.comments.ctaTitle", { defaultValue: "Leave a comment" })}
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {t("home.comments.ctaSubtitle", {
                    defaultValue:
                      "Share a short note about the collaboration. The existing API submission flow stays unchanged, but the interaction is now lighter and more focused.",
                  })}
                </p>
              </div>
            <Button
              onClick={() => setModalOpen(true)}
              className="rounded-2xl px-5 py-3 shadow-[0_22px_44px_-24px_rgba(99,102,241,0.65)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {t("home.comments.ctaTitle", { defaultValue: "Leave a comment" })}
            </Button>
          </div>
        </Card>

        <div className="mt-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {t("home.comments.listLabel", { defaultValue: "Community Notes" })}
              </div>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {t("home.comments.listTitle", { defaultValue: "Public comments" })}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {t("home.comments.listSubtitle", {
                  defaultValue:
                    "Approved comments from visitors and collaborators, styled to match the testimonial cards.",
                })}
              </p>
            </div>

            {commentsQuery.error ? (
              <Button onClick={commentsQuery.refetch} variant="secondary" className="rounded-2xl px-4 py-2.5">
                {t("common.retry", { defaultValue: "Try again" })}
              </Button>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {commentsQuery.loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="rounded-[28px] p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                      <div className="min-w-0 flex-1">
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      </div>
                    </div>
                    <div className="mt-5 h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </Card>
                ))
              : comments.map((item) => (
                  <FeedbackCard
                    key={item.id}
                    name={item.name}
                    avatarUrl={item.avatar_url}
                    meta={[item.role, item.source].filter(Boolean).join(" / ")}
                    quote={item.comment}
                    rating={item.rating || undefined}
                    accent="secondary"
                    trailing={
                      item.submitted_at ? (
                        <span>
                          {formatDate(item.submitted_at, i18n.language, {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      ) : null
                    }
                  />
                ))}
          </div>

          {!commentsQuery.loading && !comments.length && !commentsQuery.error ? (
            <Card className="rounded-[24px] p-5 text-sm text-slate-600 dark:text-slate-300">
              {t("home.comments.none", {
                defaultValue: "No public comments have been approved yet.",
              })}
            </Card>
          ) : null}

          {commentsQuery.error ? (
            <Card className="mt-5 rounded-[24px] p-5">
              <div className="font-extrabold">
                {t("home.comments.loadError", {
                  defaultValue: "Unable to load comments",
                })}
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {commentsQuery.error.message}
              </p>
            </Card>
          ) : null}

          {commentsQuery.pagination ? (
            <div className="mt-6">
              <Pagination
                page={commentsQuery.pagination.page}
                lastPage={commentsQuery.pagination.last_page}
                onPageChange={setPage}
              />
            </div>
          ) : null}
        </div>
      </Container>

      <CommentComposerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={handleSubmitted}
      />
    </MotionSection>
  );
}
