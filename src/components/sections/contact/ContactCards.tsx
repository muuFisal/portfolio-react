import type { IconType } from "react-icons";
import {
  FaClock,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock,
  FaWhatsapp,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import type { ContactInfoPayload } from "../../../app/api/types";
import { cleanHost } from "../../../utils/portfolio";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import MotionSection from "../../ui/MotionSection";

type PrimaryItem = {
  label: string;
  value: string;
  href: string | null;
  icon: IconType;
};

type SocialItem = {
  label: string;
  href: string;
  icon: IconType;
};

function InfoCard({ item }: { item: PrimaryItem }) {
  const Icon = item.icon;

  return (
    <Card className="group rounded-[24px] border-slate-200/80 bg-white/85 p-5 shadow-[0_22px_60px_-36px_rgba(15,23,42,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-34px_rgba(15,23,42,0.36)] dark:border-slate-800/80 dark:bg-slate-900/55">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/10 transition group-hover:bg-primary group-hover:text-white">
          <Icon className="text-sm" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            {item.label}
          </div>
          {item.href ? (
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="mt-2 block break-words text-sm font-semibold text-slate-900 transition hover:text-primary dark:text-white"
            >
              {item.value}
            </a>
          ) : (
            <div className="mt-2 break-words text-sm font-semibold text-slate-900 dark:text-white">
              {item.value}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function SocialLinkButton({ item }: { item: SocialItem }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-start shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white hover:shadow-md dark:border-slate-800/80 dark:bg-slate-950/45 dark:hover:border-primary/35 dark:hover:bg-slate-950/70"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-primary group-hover:text-white dark:bg-slate-900 dark:text-slate-200">
        <Icon className="text-sm" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-slate-900 dark:text-white">
          {item.label}
        </span>
        <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
          {cleanHost(item.href)}
        </span>
      </span>
      <FaArrowUpRightFromSquare className="text-xs text-slate-400 transition group-hover:text-primary" />
    </a>
  );
}

export default function ContactCards({
  info,
  loading,
  error,
  onRetry,
}: {
  info: ContactInfoPayload | null;
  loading: boolean;
  error: { message: string } | null;
  onRetry: () => void;
}) {
  const { t } = useTranslation();
  const primaryItems: PrimaryItem[] = [
    info?.email
      ? {
          label: t("contact.cards.email", { defaultValue: "Email" }),
          value: info.email,
          href: `mailto:${info.email}`,
          icon: FaEnvelope,
        }
      : null,
    info?.phone
      ? {
          label: t("contact.cards.phone", { defaultValue: "Phone" }),
          value: info.phone,
          href: `tel:${info.phone}`,
          icon: FaPhoneAlt,
        }
      : null,
    info?.location
      ? {
          label: t("contact.cards.location", { defaultValue: "Location" }),
          value: info.location,
          href: null,
          icon: FaMapMarkerAlt,
        }
      : null,
    info?.availability
      ? {
          label: t("contact.cards.availability", { defaultValue: "Availability" }),
          value: info.availability,
          href: null,
          icon: FaClock,
        }
      : null,
    info?.office_hours
      ? {
          label: t("contact.cards.officeHours", { defaultValue: "Office Hours" }),
          value: info.office_hours,
          href: null,
          icon: FaRegClock,
        }
      : null,
  ].filter(Boolean) as PrimaryItem[];

  const socialItems: SocialItem[] = [
    info?.socials.linkedin
      ? {
          label: t("contact.cards.linkedin", { defaultValue: "LinkedIn" }),
          href: info.socials.linkedin,
          icon: FaLinkedinIn,
        }
      : null,
    info?.socials.github
      ? {
          label: t("contact.cards.github", { defaultValue: "GitHub" }),
          href: info.socials.github,
          icon: FaGithub,
        }
      : null,
    info?.socials.x
      ? { label: t("contact.cards.x", { defaultValue: "X" }), href: info.socials.x, icon: FaXTwitter }
      : null,
    info?.socials.instagram
      ? {
          label: t("contact.cards.instagram", { defaultValue: "Instagram" }),
          href: info.socials.instagram,
          icon: FaInstagram,
        }
      : null,
    info?.socials.whatsapp
      ? {
          label: t("contact.cards.whatsapp", { defaultValue: "WhatsApp" }),
          href: info.socials.whatsapp,
          icon: FaWhatsapp,
        }
      : null,
  ].filter(Boolean) as SocialItem[];

  return (
    <MotionSection>
      <div className="space-y-4">
        {error ? (
          <Card className="rounded-[24px] p-5">
            <div className="font-extrabold">
              {t("contact.cards.loadError", { defaultValue: "Unable to load contact details" })}
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{error.message}</p>
            <div className="mt-4">
              <Button onClick={onRetry} variant="secondary">
                {t("common.retry", { defaultValue: "Try again" })}
              </Button>
            </div>
          </Card>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="rounded-[24px] p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                    <div className="flex-1">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </Card>
              ))
            : primaryItems.map((item) => <InfoCard key={item.label} item={item} />)}
        </div>

        {socialItems.length || info?.resume_url ? (
          <Card className="rounded-[28px] border-slate-200/80 bg-white/85 p-5 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.34)] dark:border-slate-800/80 dark:bg-slate-900/55 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {t("contact.cards.socialsTitle", { defaultValue: "Socials" })}
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {t("contact.cards.socialsSubtitle", {
                    defaultValue: "Quick links for a lighter, more direct way to connect.",
                  })}
                </div>
              </div>
              {info?.resume_url ? (
                <a href={info.resume_url} target="_blank" rel="noreferrer">
                  <Button variant="ghost" className="rounded-2xl px-4 py-2.5">
                    {t("contact.cards.resume", { defaultValue: "Open Resume" })}
                  </Button>
                </a>
              ) : null}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {socialItems.map((item) => (
                <SocialLinkButton key={item.label} item={item} />
              ))}
            </div>
          </Card>
        ) : null}

        {!loading && !primaryItems.length && !socialItems.length && !error ? (
          <Card className="rounded-[24px] p-5 text-sm text-slate-600 dark:text-slate-300">
            {t("contact.cards.unavailable", {
              defaultValue: "Contact details are not available yet.",
            })}
          </Card>
        ) : null}
      </div>
    </MotionSection>
  );
}
