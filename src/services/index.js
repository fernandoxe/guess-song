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
  selectOption: (optionNumber, option) => {
    window.gtag('event', 'Select option', {
      'event_category' : 'Song',
      'event_label' : `${optionNumber} | ${option}`,
    });
  },
  sendError: (description) => {
    window.gtag('send', 'exception', {
      'exDescription': description,
      'exFatal': false,
    });
  },
};