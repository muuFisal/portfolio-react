import Button from "./Button";
import { useTranslation } from "react-i18next";
import { storage } from "../../utils/storage";

export default function LangToggle() {
  const { i18n } = useTranslation();

  const toggle = async () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    await i18n.changeLanguage(next);
    storage.setLng(next);
  };

  return (
    <Button variant="secondary" onClick={toggle} aria-label="Toggle language">
      🌐 <span className="hidden sm:inline">{i18n.language === "ar" ? "English" : "العربية"}</span>
    </Button>
  );
}
