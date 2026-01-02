import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';
import es from './locales/es.json';

import industriesPtBR from './locales/industries/pt-BR.json';
import industriesEnUS from './locales/industries/en-US.json';
import industriesEs from './locales/industries/es.json';

const resources = {
  'pt-BR': { 
    translation: ptBR,
    industries: industriesPtBR
  },
  'en-US': { 
    translation: enUS,
    industries: industriesEnUS
  },
  'es': { 
    translation: es,
    industries: industriesEs
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    ns: ['translation', 'industries'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;