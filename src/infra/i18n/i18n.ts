import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import commonPT from './locales/pt/common.json';
import dashboardPT from './locales/pt/dashboard.json';
import errorsPT from './locales/pt/errors.json';
import loginPT from './locales/pt/login.json';

import commonEN from './locales/en/common.json';
import errorsEN from './locales/en/errors.json';
import loginEN from './locales/en/login.json';

const resources = {
  pt: {
    common: commonPT,
    login: loginPT,
    errors: errorsPT,
    dashboard: dashboardPT,
  },
  en: {
    common: commonEN,
    login: loginEN,
    errors: errorsEN,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
