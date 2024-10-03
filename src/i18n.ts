// src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Load translations using HTTP (like from a server or local files)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Fallback language if the user's language isn't available
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes content, no need to do it again
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to load translations
    },
  });

export default i18n;
