import allSongs from '../../data';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Song from '../Song';
import Score from '../Score';
import { gtm } from '../../services';
import Loader from '../Loader';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomSongs = (number, array) => {
  const arrayCopy = [...array];
  const songs = [];
  for (let i = 0; i < number; i++) {
    const randomIndex = getRandomNumber(0, arrayCopy.length);
    const song = arrayCopy.splice(randomIndex, 1);
    songs.push(song[0]);
  }
  return songs;
};

const LEVELS = 4;
const OPTIONS = 2;
const songs = getRandomSongs(LEVELS, allSongs);

const Game = () => {
  const gameSongs = songs;
  const [actualSong, setActualSong] = useState(null);
  const [leftSongs, setLeftSongs] = useState(songs);
  const [actualOptions, setActualOptions] = useState([]);
  const [actualLevel, setActualLevel] = useState(null);
  const [successfulSongs, setSuccessfulSongs] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    playLevel(0);
    gtm.startGame();
  };

  const finishGame = () => {
    setActualSong(null);
    setGameFinished(true);
    gtm.endGame(0, successfulSongs.length);
  };

  const playLevel = (number) => {
    if(leftSongs.length === 0) {
      finishGame();
      return;
    }
    setActualLevel(number);
    const actual = gameSongs[number];
    setActualSong(actual);
    const left = gameSongs.slice(number + 1);
    setLeftSongs(left);
    const options = getRandomOptions(actual, allSongs);
    insertSongInOptions(actual, options);
    setActualOptions(options);
    gtm.startSong(number, actual);
  };

  const insertSongInOptions = (song, options) => {
    const randomIndex = getRandomNumber(0, OPTIONS);
    options.splice(randomIndex, 0, song);
  };

  const getRandomOptions = (song, array) => {
    const arrayCopy = [...array];
    const songIndex = arrayCopy.indexOf(song);
    arrayCopy.splice(songIndex, 1);
    const randomOptions = getRandomSongs(OPTIONS - 1, arrayCopy);
    return randomOptions;
  };

  const handleOptionSelect = (successful, option, optionNumber) => {
    if(successful) {
      setSuccessfulSongs([
        ...successfulSongs,
        actualSong,
      ]);
    }
    playLevel(actualLevel + 1);
    gtm.selectOption(optionNumber, option);
    gtm.endSong(0, successful);
  }

  return (
    <Container>
      { loading && <Loader /> }
      { actualSong && <Song
        song={actualSong}
        options={actualOptions}
        onOptionSelect={handleOptionSelect}
      />}
      {gameFinished &&
        <Score songs={successfulSongs} />
      }
    </Container>
  );
};

export default Game;