import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationUK from "../lang/uk-UA.json";

const resources = {
  uk: {
    translation: translationUK,
  },
};

i18n.use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'uk-UA',
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;