import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationFR from "./fr.json";

export const languages = ["en", "fr"];

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false
    }
});

export function setAppLanguage(language: string) {
    if(language.includes(language)) {
        i18n.changeLanguage(language);
        localStorage.setItem("languagePreference", language);
    }
}

export function getAppLanguage() {
    return localStorage.getItem("languagePreference") ?? "en";
}

export default i18n;