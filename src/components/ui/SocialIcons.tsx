import { SOCIAL_LINKS } from "../../config/social";
import { useSettings } from "../../app/settings/context";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaBehance,
} from "react-icons/fa";
import { clsx } from "clsx";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  behance: FaBehance,
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  const { settings } = useSettings();

  // Prefer backend settings if available; fallback to static config.
  const links = (() => {
    if (!settings) return SOCIAL_LINKS;
    const s = settings;
    const fromSettings = [
      s.facebook ? { key: "facebook", label: "Facebook", href: s.facebook } : null,
      s.whatsapp ? { key: "whatsapp", label: "WhatsApp", href: s.whatsapp } : null,
      s.instagram ? { key: "instagram", label: "Instagram", href: s.instagram } : null,
      s.linkedin ? { key: "linkedin", label: "LinkedIn", href: s.linkedin } : null,
      s.github ? { key: "github", label: "GitHub", href: s.github } : null,
      s.behance ? { key: "behance", label: "Behance", href: s.behance } : null,
      s.x ? { key: "x", label: "X", href: s.x } : null,
      s.youtube ? { key: "youtube", label: "YouTube", href: s.youtube } : null,
      s.tiktok ? { key: "tiktok", label: "TikTok", href: s.tiktok } : null,
    ].filter(Boolean) as typeof SOCIAL_LINKS;

    return fromSettings.length ? fromSettings : SOCIAL_LINKS;
  })();

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {links
        .filter((s) => !!s.href && String(s.href).trim() !== "")
        .map((s) => {
        const Icon = ICONS[s.key] ?? FaGithub;
        return (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="group inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:border-primary/40 dark:hover:text-primary"
          >
            <Icon className="text-[15px] transition group-hover:scale-110" />
          </a>
        );
      })}
    </div>
  );
}
