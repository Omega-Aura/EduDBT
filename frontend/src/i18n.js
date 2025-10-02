import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Load translations from public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Supported languages
    supportedLngs: ['en', 'hi', 'bn', 'mr', 'te', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa', 'as'],
    
    // Namespaces for organizing translations
    ns: ['common', 'navigation', 'auth', 'home', 'dashboard', 'profile', 'learning', 'quiz', 'help', 'errors'],
    defaultNS: 'common',
    
    // Detection options
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      lookupLocalStorage: 'userLanguage',
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
    
    // Backend options for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}',
    },
    
    interpolation: {
      escapeValue: false, // React already escapes
      formatSeparator: ',',
      format: function (value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        if (value instanceof Date) return new Intl.DateTimeFormat(lng).format(value);
        return value;
      }
    },
    
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'],
    }
  });

export default i18n;
