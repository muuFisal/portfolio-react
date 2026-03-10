import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import LangToggle from "../ui/LangToggle";
import ThemeToggle from "../ui/ThemeToggle";
import Container from "./Container";
import { useSettings } from "../../app/settings/context";
import { buildNavigationItems, isExternalHref } from "../../utils/portfolio";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
      : "hover:bg-slate-100 dark:hover:bg-slate-800"
  }`;

export default function Navbar() {
  const { t } = useTranslation();
  const { settings, navigation } = useSettings();
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(() => {
    const apiItems = buildNavigationItems(navigation);
    if (apiItems.length) {
      return apiItems;
    }

    return [
      { label: t("nav.about", { defaultValue: "About" }), href: "/about", target: "_self" },
      { label: t("nav.projects", { defaultValue: "Projects" }), href: "/projects", target: "_self" },
      {
        label: t("nav.experience", { defaultValue: "Experience" }),
        href: "/experience",
        target: "_self",
      },
      { label: t("nav.events", { defaultValue: "Events" }), href: "/events", target: "_self" },
      { label: t("nav.contact", { defaultValue: "Contact" }), href: "/contact", target: "_self" },
    ];
  }, [navigation, t]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const siteName = settings?.site_name || "Fisal Portfolio";
  const logoLight = settings?.branding.logo_url || "";
  const logoDark = settings?.branding.logo_dark_url || settings?.branding.logo_url || "";
  const resumeUrl = settings?.branding.resume_url || "";
  const email = settings?.contacts.email;
  const linkedin = settings?.socials.linkedin;
  const github = settings?.socials.github;
  const whatsapp = settings?.contacts.whatsapp;

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex flex-col items-center">
      <div
        className={clsx(
          "w-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-300 transition-all duration-500 dark:border-b dark:border-slate-800/80 dark:bg-slate-950/90",
          scrolled ? "pointer-events-none absolute -translate-y-full opacity-0" : "relative translate-y-0 opacity-100"
        )}
      >
        <Container className="flex items-center justify-between">
          <div className="hidden sm:block">
            {settings?.site_description ||
              t(
                "home.trust.remote",
                "Available for freelance, consulting, and full-time opportunities"
              )}
          </div>
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:ml-auto sm:justify-end">
            {email ? (
              <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                Email
              </a>
            ) : null}
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#0a66c2]"
              >
                LinkedIn
              </a>
            ) : null}
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>
            ) : null}
            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#25D366]"
              >
                WhatsApp
              </a>
            ) : null}
          </div>
        </Container>
      </div>

      <div className="mt-0 flex w-full justify-center pointer-events-none">
        <div
          className={clsx(
            "pointer-events-auto max-w-[100vw] transition-all duration-500",
            scrolled
              ? "mt-4 w-full rounded-3xl border border-slate-200/80 bg-white/90 px-2 shadow-lg shadow-slate-200/50 backdrop-blur-lg sm:w-auto sm:px-6 dark:border-slate-800/80 dark:bg-slate-950/80 dark:shadow-slate-900/50"
              : "w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
          )}
        >
          <div
            className={clsx(
              "mx-auto transition-all duration-500",
              scrolled ? "max-w-5xl" : "w-full max-w-6xl px-4"
            )}
          >
            <div
              className={clsx(
                "flex items-center justify-between gap-3 transition-all duration-500",
                scrolled ? "min-h-[60px] py-2" : "min-h-[72px] py-3"
              )}
            >
              <Link to="/" className="flex items-center gap-3">
                <span
                  className={clsx(
                    "inline-flex items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-500 dark:border-slate-800 dark:bg-slate-950",
                    scrolled ? "h-10 w-10" : "h-12 w-12"
                  )}
                >
                  {logoLight ? (
                    <img
                      src={logoLight}
                      alt={siteName}
                      className="h-full w-full object-contain p-1.5 dark:hidden"
                      loading="lazy"
                    />
                  ) : null}
                  {logoDark ? (
                    <img
                      src={logoDark}
                      alt={siteName}
                      className="hidden h-full w-full object-contain p-1.5 dark:block"
                      loading="lazy"
                    />
                  ) : null}
                </span>

                {!logoLight && !logoDark ? (
                  <span
                    className={clsx(
                      "leading-none font-extrabold tracking-tight text-slate-900 uppercase transition-all duration-500 dark:text-white",
                      scrolled ? "text-lg" : "text-xl"
                    )}
                  >
                    {siteName}
                  </span>
                ) : null}
              </Link>

              <nav className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) =>
                  isExternalHref(item.href) || item.target === "_blank" ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target={item.target || "_blank"}
                      rel="noreferrer"
                      className="rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <NavLink key={item.href} to={item.href} className={linkClass}>
                      {item.label}
                    </NavLink>
                  )
                )}
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                {resumeUrl ? (
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="hidden md:inline-flex">
                    <Button
                      variant="secondary"
                      className={clsx(
                        "transition-all duration-500",
                        scrolled ? "px-3 py-1.5 text-xs" : "px-4 py-2"
                      )}
                    >
                      {t("nav.cv", { defaultValue: "CV" })}
                    </Button>
                  </a>
                ) : null}
                <LangToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
