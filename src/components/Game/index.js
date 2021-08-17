import allSongs from '../../data';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Song from '../Song';
import Score from '../Score';
import config from '../../config';
import { gtm } from '../../services';
import Loader from '../Loader';
import ActualScore from '../ActualScore';

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

const LEVELS = config.gameLevels;
const OPTIONS = config.songOptions;
const POINTS_BASE = config.pointsBase;

const Game = (props) => {
  const [gameSongs, setGameSongs] = useState([]);
  const [actualSong, setActualSong] = useState(null);
  const [actualOptions, setActualOptions] = useState([]);
  const [actualLevel, setActualLevel] = useState(-1);
  const [successfulSongs, setSuccessfulSongs] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    console.log('game init');
    startGame();
  }, []);

  useEffect(() => {
    if(actualLevel > -1) {
      const actual = gameSongs[actualLevel];
      setActualSong(actual);
      const options = getRandomOptions(actual, allSongs);
      insertSongInOptions(actual, options);
      setActualOptions(options);
      gtm.startSong(actualLevel, actual);
    }
  }, [actualLevel, gameSongs]);

  const startGame = () => {
    const songs = getRandomSongs(LEVELS, allSongs);
    setGameSongs(songs);
    setActualLevel(0);
    gtm.startGame();
  };

  useEffect(() => {
    if(gameFinished) {
      gtm.endGame(points, successfulSongs.length);
    }
  }, [gameFinished, points, successfulSongs.length]);

  const finishGame = () => {
    setGameFinished(true);
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

  const handleOptionClick = (successful, option, optionNumber, leftTime) => {
    const songPoints = POINTS_BASE + Math.round(leftTime * POINTS_BASE);
    if(successful) {
      setSuccessfulSongs([
        ...successfulSongs,
        actualSong,
      ]);
      setPoints(points + songPoints);
    }
    gtm.selectOption(optionNumber, option);
    gtm.endSong(songPoints, successful);
  };

  const handleOptionSelect = () => {
    setLoading(true);
    setActualSong(null);
    if(actualLevel + 1 < LEVELS) {
      setActualLevel(actualLevel + 1);
    } else {
      finishGame();
    }
  };

  const handleLoadedSong = () => {
    setLoading(false);
  };

  const handleScoreLoaded = () => {
    setLoading(false);
  };

  return (
    <Container>
      {loading && <Loader />}
      {!gameFinished &&
        <ActualScore songs={successfulSongs.length} score={points} />
      }
      { actualSong && <Song
        song={actualSong}
        options={actualOptions}
        onOptionClick={handleOptionClick}
        onOptionSelect={handleOptionSelect}
        onLoadedSong={handleLoadedSong}
      />}
      {gameFinished &&
        <Score
          songs={successfulSongs}
          points={points}
          onLoaded={handleScoreLoaded}
        />
      }
    </Container>
  );
};

export default Game;