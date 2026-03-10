import type { ComponentType } from "react";
import { clsx } from "clsx";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { useSettings } from "../../app/settings/context";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  x: FaXTwitter,
  youtube: FaYoutube,
  tiktok: SiTiktok,
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  const { settings } = useSettings();
  const socials = settings?.socials;

  const links = socials
    ? [
        ...Object.entries(socials).filter(([, href]) => Boolean(href)),
        ...(settings?.contacts.whatsapp
          ? [["whatsapp", settings.contacts.whatsapp] as const]
          : []),
      ]
    : settings?.contacts.whatsapp
    ? [["whatsapp", settings.contacts.whatsapp] as const]
    : [];

  if (!links.length) {
    return null;
  }

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {links.map(([key, href]) => {
        const Icon = ICONS[key];
        if (!Icon || !href) {
          return null;
        }

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={key}
            className="group inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:border-primary/40 dark:hover:text-primary"
          >
            <Icon className="text-[15px] transition group-hover:scale-110" />
          </a>
        );
      })}
    </div>
  );
}
