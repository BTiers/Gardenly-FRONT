import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './translations/fr.json';
import en from './translations/en.json';

i18next.use(LanguageDetector).init({
  resources: {
    en,
    fr
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18next;
