import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Play': 'Play',
      'What is this song?': 'What is this song?',
      'X guessed songs': '{{count}} guessed song',
      'X guessed songs_plural': '{{count}} guessed songs',
      'Total score': 'Total score: {{count}}',
      'Share': 'Share',
      'Save screenshot': 'Save screenshot',
      'My score': `My score in ${process.env.REACT_APP_TITLE}`
    },
  },
  es: {
    translation: {
      'Play': 'Jugar',
      'What is this song?': 'Qué canción es esta?',
      'X guessed songs': '{{count}} canción adivinada',
      'X guessed songs_plural': '{{count}} canciones adivinadas',
      'Total score': 'Puntaje total: {{count}}',
      'Share': 'Compartir',
      'Save screenshot': 'Guardar captura',
      'My score': `Mi puntaje en ${process.env.REACT_APP_TITLE}`
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('es') ? 'es': 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;