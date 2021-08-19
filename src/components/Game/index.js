import allSongs from '../../data';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const audioRef = useRef(new Audio());
  const [audioDuration, setAudioDuration] = useState(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(null);
  const [highScore, setHighScore] = useState(0);

  const startGame = useCallback(() => {
    console.log('start game');

    const hs = localStorage.getItem('highScore');
    hs && setHighScore(hs);

    const songs = getRandomSongs(LEVELS, allSongs);
    setGameSongs(songs);
    setActualLevel(0);

    audioRef.current.onloadedmetadata = handleLoadedSong;
    audioRef.current.ontimeupdate = handleTimeUpdate;

    gtm.startGame();
  }, []);

  useEffect(() => {
    console.log('game init');
    startGame();
  }, [startGame]);

  useEffect(() => {
    console.log('start new level', actualLevel);
    if(actualLevel > -1) {
      const actual = gameSongs[actualLevel];
      setActualSong(actual);
      const options = getRandomOptions(actual, allSongs);
      insertSongInOptions(actual, options);
      setActualOptions(options);

      audioRef.current.src = `${config.musicpath}/${actual}.${config.fileextension}`;

      gtm.startSong(actualLevel, actual);
    }
  }, [actualLevel, gameSongs]);

  useEffect(() => {
    if(gameFinished) {
      console.log('game finished', points);
      gtm.endGame(points, successfulSongs.length);
    }
  }, [gameFinished, points, successfulSongs.length]);
  
  useEffect(() => {
    if(gameFinished) {
      console.log('points game finished');
      if(points > highScore) {
        console.log('points > highscore');
        setHighScore(points);
        localStorage.setItem('highScore', points);
      }
    }
  }, [points, gameFinished, highScore]);

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

  const handleOptionClick = (successful, option, optionNumber) => {
    const leftTime = audioRef.current.duration - audioRef.current.currentTime;
    let songPoints = 0;
    audioRef.current.pause();
    if(successful) {
      setSuccessfulSongs([
        ...successfulSongs,
        actualSong,
      ]);
      songPoints = POINTS_BASE + Math.round(leftTime * POINTS_BASE);
      setPoints(points + songPoints);
    }
    gtm.selectOption(optionNumber, option);
    gtm.endSong(songPoints, successful);
    console.log('option clicked:', audioRef.current.duration, leftTime, songPoints);
  };

  const handleOptionSelect = () => {
    setLoading(true);
    setActualSong(null);
    if(actualLevel + 1 < LEVELS) {
      setActualLevel(actualLevel + 1);
    } else {
      finishGame();
      console.log('points before game finished', points);
    }
  };

  const handleLoadedSong = () => {
    setAudioDuration(audioRef.current.duration);
    audioRef.current.play();
    setLoading(false);
  };

  const handleTimeUpdate = () => {
    setAudioCurrentTime(audioRef.current.currentTime);
  };

  const handleScoreLoaded = () => {
    setLoading(false);
  };

  return (
    <Container>
      {loading && <Loader />}
      <ActualScore
        highScore={highScore}
        songs={successfulSongs.length}
        score={points}
        gameFinished={gameFinished}
      />
      { actualSong && <Song
        song={actualSong}
        duration={audioDuration}
        currentTime={audioCurrentTime}
        options={actualOptions}
        onOptionClick={handleOptionClick}
        onOptionSelect={handleOptionSelect}
      />}
      {gameFinished &&
        <Score
          highScore={highScore}
          songs={successfulSongs}
          points={points}
          onLoaded={handleScoreLoaded}
        />
      }
    </Container>
  );
};

export default Game;