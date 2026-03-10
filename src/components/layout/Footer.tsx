import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "./Container";
import Button from "../ui/Button";
import SocialIcons from "../ui/SocialIcons";
import { useSettings } from "../../app/settings/context";

export default function Footer() {
  const { t } = useTranslation();
  const { settings, navigation } = useSettings();

  const brand = settings?.site_name || "Mohamed Fisal";
  const footerText = settings?.site_description || t("footer.tagline");
  const resumeUrl = settings?.branding.resume_url;
  const copyright =
    settings?.copyright || `© ${new Date().getFullYear()} ${brand}. ${t("footer.rights")}`;

  const internalLinks = navigation.filter(
    (item) => item.target !== "_blank" && item.href.startsWith("/")
  );

  return (
    <footer className="mt-16 border-t border-slate-200 py-10 dark:border-slate-800">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr,0.8fr]">
          <div>
            <div className="text-xl font-extrabold">{brand}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {footerText}
            </p>
            {resumeUrl ? (
              <div className="mt-4">
                <a href={resumeUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary">
                    {t("footer.cv", { defaultValue: "Download CV" })}
                  </Button>
                </a>
              </div>
            ) : null}
          </div>

          <div>
            <div className="font-extrabold">{t("footer.quick", { defaultValue: "Quick Links" })}</div>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              {(internalLinks.length
                ? internalLinks
                : [
                    { href: "/about", label: t("nav.about", { defaultValue: "About" }) },
                    { href: "/projects", label: t("nav.projects", { defaultValue: "Projects" }) },
                    {
                      href: "/experience",
                      label: t("nav.experience", { defaultValue: "Experience" }),
                    },
                    { href: "/events", label: t("nav.events", { defaultValue: "Events" }) },
                    { href: "/contact", label: t("nav.contact", { defaultValue: "Contact" }) },
                  ]
              ).map((item) => (
                <Link key={item.href} to={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <SocialIcons className="justify-start lg:justify-end" />
            <p className="text-sm text-slate-500 dark:text-slate-400">{copyright}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
