import { NavLink } from "react-router-dom";
import Container from "./Container";
import ThemeToggle from "../ui/ThemeToggle";
import LangToggle from "../ui/LangToggle";
import { useTranslation } from "react-i18next";
import SocialIcons from "../ui/SocialIcons";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
      : "hover:bg-slate-100 dark:hover:bg-slate-900/60"
  }`;

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <NavLink to="/" className="font-extrabold tracking-tight">
            <span className="text-slate-900 dark:text-white">Mohamed Fisal</span>
            <span className="text-slate-500 dark:text-slate-300">.Portfolio</span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/projects" className={linkClass}>
              {t("nav.projects")}
            </NavLink>
            <NavLink to="/experience" className={linkClass}>
              {t("nav.experience")}
            </NavLink>
            <NavLink to="/events" className={linkClass}>
              {t("nav.events")}
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              {t("nav.contact")}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <SocialIcons className="hidden md:flex" />
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
