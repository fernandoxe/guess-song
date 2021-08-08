import allSongs from '../../data';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Song from '../Song';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Game = () => {
  const [gameSongs, setGameSongs] = useState([]);
  const [actualSong, setActualSong] = useState(null);
  const [leftSongs, setLeftSongs] = useState(null);
  const [actualOptions, setActualOptions] = useState([]);
  const [actualLevel, setActualLevel] = useState(null);
  const [successfulSongs, setSuccessfulSongs] = useState([]);

  useEffect(() => {
    console.log('useeffect start game');
    const songs = getRandomSongs(20, allSongs);
    setGameSongs(songs);
    // setActualSongs(songs);
    setLeftSongs(songs);

    startGame();
  }, []);

  const startGame = () => {
    setActualLevel(0);
  };

  useEffect(() => {
    console.log('useeffect play level:', actualLevel);
    actualLevel >= 0 && leftSongs?.length && playLevel(actualLevel);
    if(leftSongs?.length === 0) {
      finishGame();
    }
  }, [actualLevel]);

  const finishGame = () => {
    console.log('game finished');
  };

  const playLevel = (number) => {
    const actual = gameSongs[number];
    setActualSong(actual);
    const left = gameSongs.slice(number + 1);
    setLeftSongs(left);
    const options = getRandomOptions(actual, allSongs);
    insertSongInOptions(actual, options);
    setActualOptions(options);
  };

  const insertSongInOptions = (song, options) => {
    const randomIndex = getRandomNumber(0, 4);
    options.splice(randomIndex, 0, song);
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomOptions = (song, array) => {
    const arrayCopy = [...array];
    const songIndex = arrayCopy.indexOf(song);
    arrayCopy.splice(songIndex, 1);
    const randomOptions = getRandomSongs(3, arrayCopy);
    return randomOptions;
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

  const handleOptionSelect = (successful) => {
    if(successful) {
      setSuccessfulSongs([
        ...successfulSongs,
        actualSong,
      ]);
    }
    setActualLevel(actualLevel + 1);
  }

  return (
    <Container>
      { actualSong && <Song
        song={actualSong}
        options={actualOptions}
        onOptionSelect={handleOptionSelect}
      />}
    </Container>
  );
};

export default Game;