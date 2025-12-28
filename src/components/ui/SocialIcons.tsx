import { SOCIAL_LINKS } from "../../config/social";
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
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {SOCIAL_LINKS.map((s) => {
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
