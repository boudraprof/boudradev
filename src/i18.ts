import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DateTime } from "luxon";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.services.formatter!.add(
  "DATE_HUGE",
  (value: Date, lng: string | undefined) => {
    return DateTime.fromJSDate(value)
      .setLocale(lng!)
      .toLocaleString(DateTime.DATE_HUGE);
  }
);

export default i18n;
