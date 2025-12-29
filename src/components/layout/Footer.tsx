import Container from "./Container";
import SocialIcons from "../ui/SocialIcons";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../app/settings/context";

export default function Footer() {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const brand = settings?.site_name || "Mohamed Fisal";
  const footerText = settings?.footer_text || t("footer.tagline");
  const links = (settings?.nav_links || []).filter((l) => !!l.url && l.url.trim() !== "");

  return (
    <footer className="mt-16 border-t border-slate-200 py-10 dark:border-slate-800">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-extrabold">{brand}</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {footerText}
            </p>

            {links.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-extrabold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-200"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <SocialIcons className="justify-start md:justify-end" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} {t("footer.rights")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
