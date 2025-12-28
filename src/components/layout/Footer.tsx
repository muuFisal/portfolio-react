import Container from "./Container";
import SocialIcons from "../ui/SocialIcons";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-16 border-t border-slate-200 py-10 dark:border-slate-800">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-extrabold">Mohamed Fisal</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {t("footer.tagline")}
            </p>
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
