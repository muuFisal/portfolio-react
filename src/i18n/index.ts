import i18n, { BackendModule, ReadCallback } from "i18next";
import { initReactI18next } from "react-i18next";

const savedLng = localStorage.getItem("lng") || "en";

const customBackend: BackendModule = {
  type: "backend" as const,
  init: () => { },
  read: (language: string, namespace: string, callback: ReadCallback) => {
    fetch(`/locales/${language}/${namespace}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load translations");
        return res.json();
      })
      .then((data) => callback(null, data))
      .catch((error) => callback(error, null));
  },
};

i18n
  .use(customBackend)
  .use(initReactI18next)
  .init({
    lng: savedLng,
    fallbackLng: "en",
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    backend: {}, // Trigger backend execution
  });

export default i18n;
