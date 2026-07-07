import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './fr.json';
import en from './en.json';

const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('topocalc-lang')) || 'fr';

i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: 'fr',
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
