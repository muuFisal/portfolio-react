import { NavLink } from "react-router-dom";
import Container from "./Container";
import ThemeToggle from "../ui/ThemeToggle";
import LangToggle from "../ui/LangToggle";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../app/settings/context";
import Button from "../ui/Button";
import { getProfileData } from "../../utils/profile";
import { useState, useEffect } from "react";
import clsx from "clsx";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive
    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
    : "hover:bg-slate-100 dark:hover:bg-slate-800"
  }`;

export default function Navbar() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const profile = getProfileData(settings);
  const brand = settings?.site_name || "Fisal Portfolio";
  const logoLight = settings?.logo_url || "";
  const logoDark = settings?.logo_white || settings?.logo_url || "";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex flex-col items-center">
      {/* Top Social Bar */}
      <div
        className={clsx(
          "w-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-300 transition-all duration-500 dark:border-b dark:border-slate-800/80 dark:bg-slate-950/90",
          scrolled ? "-translate-y-full opacity-0 absolute" : "translate-y-0 opacity-100 relative"
        )}
      >
        <Container className="flex items-center justify-between">
          <div className="hidden sm:block">
            {t("home.trust.remote", "Available for freelance, consulting, and full-time opportunities")}
          </div>
          <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:ml-auto sm:justify-end">
            <a href="mailto:contact@mohamed-fisal.com" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email
            </a>
            <a href={settings?.linkedin || "https://linkedin.com/in/mohamed-fisal"} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[#0a66c2]">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
            <a href={settings?.github || "https://github.com/muuFisal"} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 006.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.025a9.28 9.28 0 015 0c1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.65.7 1.025 1.588 1.025 2.688 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .263.187.575.687.475A9.995 9.995 0 0022 12c0-5.525-4.475-10-10-10z" /></svg>
              GitHub
            </a>
            <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[#25D366]">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.393 0 .013 5.38.013 12.015c0 2.12.553 4.19 1.604 6.01L.004 24l6.113-1.603a11.968 11.968 0 005.914 1.554h.005c6.635 0 12.014-5.38 12.014-12.016 0-3.216-1.253-6.24-3.526-8.514A11.96 11.96 0 0012.031 0zm0 21.963h-.004a9.927 9.927 0 01-5.06-1.377l-.363-.215-3.763.987.998-3.668-.236-.376A9.957 9.957 0 011.996 12.01C1.996 6.48 6.487 1.992 12.031 1.992c2.671 0 5.18 1.042 7.069 2.933a9.972 9.972 0 012.927 7.086c-.001 5.534-4.5 10.024-10.027 10.024zm5.496-7.514c-.301-.15-1.782-.876-2.058-.977-.276-.1-.477-.15-.678.15-.201.3-.777.977-.954 1.177-.175.2-.351.226-.653.076-1.242-.619-2.316-1.543-3.153-2.717-.215-.3-.023-.464.127-.614.135-.136.302-.351.452-.526.151-.176.201-.301.302-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.631-.929-2.233-.243-.585-.492-.505-.678-.515-.175-.01-.376-.01-.577-.01s-.526.075-.802.376c-.276.3-.1.745.05.975z" /></svg>
              WhatsApp
            </a>
          </div>
        </Container>
      </div>

      <div className="w-full flex justify-center mt-0 pointer-events-none">
        <div
          className={clsx(
            "pointer-events-auto transition-all duration-500 max-w-[100vw]",
            scrolled
              ? "mt-4 w-full sm:w-auto px-2 sm:px-6 rounded-3xl border border-slate-200/80 bg-white/90 shadow-lg shadow-slate-200/50 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/80 dark:shadow-slate-900/50"
              : "w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
          )}
        >
          <div className={clsx(
            "mx-auto transition-all duration-500",
            scrolled ? "max-w-4xl" : "w-full max-w-6xl px-4"
          )}>
            <div className={clsx(
              "flex items-center justify-between gap-3 transition-all duration-500",
              scrolled ? "min-h-[60px] py-2" : "min-h-[72px] py-3"
            )}>
              <NavLink to="/" className="flex items-center gap-3">
                <span className={clsx(
                  "inline-flex items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-500 dark:border-slate-800 dark:bg-slate-950",
                  scrolled ? "h-10 w-10" : "h-12 w-12"
                )}>
                  {logoLight ? <img src={logoLight} alt={brand} className="h-full w-full object-contain p-1.5 dark:hidden" loading="lazy" /> : null}
                  {logoDark ? <img src={logoDark} alt={brand} className="hidden h-full w-full object-contain p-1.5 dark:block" loading="lazy" /> : null}
                </span>
                {!logoLight && !logoDark ? <span className={clsx(
                  "font-extrabold tracking-tight text-slate-900 uppercase leading-none transition-all duration-500 dark:text-white",
                  scrolled ? "text-lg" : "text-xl"
                )}>M.FISAL</span> : null}
              </NavLink>

              <nav className="hidden items-center gap-1 lg:flex">
                <NavLink to="/about" className={linkClass}>{t("nav.about", { defaultValue: "About" })}</NavLink>
                <NavLink to="/projects" className={linkClass}>{t("nav.projects")}</NavLink>
                <NavLink to="/experience" className={linkClass}>{t("nav.experience")}</NavLink>
                <NavLink to="/contact" className={linkClass}>{t("nav.contact")}</NavLink>
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <a href={profile.cvUrl || "#"} target="_blank" rel="noreferrer" className="hidden md:inline-flex">
                  <Button variant="secondary" className={clsx("transition-all duration-500", scrolled ? "px-3 py-1.5 text-xs" : "px-4 py-2")}>{t("nav.cv", { defaultValue: "CV" })}</Button>
                </a>
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
