import { useTranslation } from "react-i18next";
import Button from "./Button";
import { storage } from "../../utils/storage";

export default function LangToggle() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  const toggle = async () => {
    const next = isArabic ? "en" : "ar";
    await i18n.changeLanguage(next);
    storage.setLng(next);
  };

  return (
    <Button variant="secondary" onClick={toggle} aria-label="Toggle language">
      {isArabic ? "EN" : "AR"}
    </Button>
  );
}
