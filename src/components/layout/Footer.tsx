import Container from "./Container";
import SocialIcons from "../ui/SocialIcons";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../app/settings/context";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { getProfileData } from "../../utils/profile";

export default function Footer() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const profile = getProfileData(settings);

  const brand = settings?.site_name || "Mohamed Fisal";
  const footerText = settings?.footer_text || t("footer.tagline");

  return (
    <footer className="mt-16 border-t border-slate-200 py-10 dark:border-slate-800">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr,0.8fr]">
          <div>
            <div className="font-extrabold text-xl">{brand}</div>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{footerText}</p>
            <div className="mt-4">
              <a href={profile.cvUrl || "#"} target="_blank" rel="noreferrer">
                <Button variant="secondary">{t("footer.cv", { defaultValue: "Download CV" })}</Button>
              </a>
            </div>
          </div>

          <div>
            <div className="font-extrabold">{t("footer.quick", { defaultValue: "Quick Links" })}</div>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <Link to="/about">{t("nav.about", { defaultValue: "About" })}</Link>
              <Link to="/projects">{t("nav.projects")}</Link>
              <Link to="/experience">{t("nav.experience")}</Link>
              <Link to="/contact">{t("nav.contact")}</Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <SocialIcons className="justify-start lg:justify-end" />
            <p className="text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} {t("footer.rights")}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
