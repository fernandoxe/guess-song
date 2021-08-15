import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Play': 'Play',
      'What is the song?': 'What is the song?',
    },
  },
  es: {
    translation: {
      'Play': 'Jugar',
      'What is the song?': 'Qué canción es?',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;