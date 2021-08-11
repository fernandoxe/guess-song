import { useRef, useState } from 'react';
import styled from 'styled-components';
import Options from '../Options';
import ProgressBar from '../ProgressBar';
import config from '../../config';

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
  const audioRef = useRef(null);
  const [audioDuration, setAudioDuration] = useState(null);
  const [audioProgress, setAudioProgress] = useState(null);

  const handleOptionSelected = (option, optionNumber) => {
    console.log('Successful:', option === props.song);
    props.onOptionSelect(option === props.song, option, optionNumber);
  };

  const handleLoadedMetadata = () => {
    setAudioDuration(audioRef?.current.duration);
  };

  const handleTimeUpdate = () => {
    setAudioProgress(audioRef?.current.currentTime);
  };

  return (
    <Container>
      <h1 className="h1">What is the song?</h1>
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
        onOptionSelect={handleOptionSelected}
      />
    </Container>
  );
};

export default Song;