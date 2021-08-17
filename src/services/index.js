export const gtm = {
  startGame: () => {
    window.gtag('event', 'Start game', {
      'event_category' : 'Game',
      'event_label' : 'Start game',
    });
  },
  endGame: (points, successfulSongs) => {
    window.gtag('event', 'End game', {
      'event_category' : 'Game',
      'event_label' : `${points} | ${successfulSongs}`,
      'non_interaction': true,
    });
  },
  startSong: (level, song) => {
    window.gtag('event', 'Start song', {
      'event_category' : 'Song',
      'event_label' : `${level} | ${song}`,
      'non_interaction': true,
    });
  },
  endSong: (points, successful) => {
    window.gtag('event', 'End song', {
      'event_category' : 'Song',
      'event_label' : `${points} | ${successful}`,
      'non_interaction': true,
    });
  },
  share: () => {
    window.gtag('event', 'Click share', {
      'event_category' : 'Share',
      'event_label' : `Share`,
    });
  },
  shareSuccessful: () => {
    window.gtag('event', 'Share successful', {
      'event_category' : 'Share',
      'event_label' : `Share`,
      'non_interaction': true,
    });
  },
  saveScreenshot: () => {
    window.gtag('event', 'Click save screenshot', {
      'event_category' : 'Share',
      'event_label' : `Save screenshot`,
    });
  },
  selectOption: (optionNumber, option) => {
    window.gtag('event', 'Select option', {
      'event_category' : 'Song',
      'event_label' : `${optionNumber} | ${option}`,
    });
  },
  sendError: (action, description) => {
    window.gtag('send', 'exception', {
      'exDescription': description,
      'exFatal': false,
    });
    window.gtag('event', action, {
      'event_category' : 'Error',
      'event_label' : description,
      'non_interaction': true,
    });
  },
};