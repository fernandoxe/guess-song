import { useRef, useState } from 'react';
import styled from 'styled-components';
import Options from '../Options';
import ProgressBar from '../ProgressBar';
import config from '../../config';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  width: 80%;
  .h1 {
    text-align: center;
    margin: 1.5rem 0;
  }
  .progress {
    height: 0.4rem;
    margin-bottom: 1.5rem;
  }
`;

const Song = (props) => {
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const [audioDuration, setAudioDuration] = useState(null);
  const [audioProgress, setAudioProgress] = useState(null);

  const handleOptionClick = (option, optionNumber) => {
    console.log('Successful:', option === props.song);
    const leftTime = audioRef.current.duration - audioRef.current.currentTime;
    audioRef.current.pause();
    props.onOptionClick(option === props.song, option, optionNumber, leftTime);
  };

  const handleOptionSelected = () => {
    props.onOptionSelect();
  };

  const handleLoadedMetadata = () => {
    setAudioDuration(audioRef?.current.duration);
    props.onLoadedSong();
  };

  const handleTimeUpdate = () => {
    setAudioProgress(audioRef?.current.currentTime);
  };

  return (
    <Container>
      <h1 className="h1">{t('What is this song?')}</h1>
      <div>
        <audio
          src={`${config.musicpath}/${props.song}.${config.fileextension}`}
          autoPlay
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          ref={audioRef}
        />
      </div>
      <div className="progress">
        { !!audioProgress && audioDuration &&
          <ProgressBar progress={audioProgress} total={audioDuration} />
        }
      </div>
      <Options
        options={props.options}
        song={props.song}
        onOptionClick={handleOptionClick}
        onOptionSelect={handleOptionSelected}
      />
    </Container>
  );
};

export default Song;