import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Play': 'Play',
      'What is this song?': 'What is this song?',
      'You guessed X songs': 'Yo guessed {{count}} song',
      'You guessed X songs_plural': 'Yo guessed {{count}} songs',
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
      'You guessed X songs': 'Adivinaste {{count}} canción',
      'You guessed X songs_plural': 'Adivinaste {{count}} canciones',
      'Total score': 'Puntos totales: {{count}}',
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