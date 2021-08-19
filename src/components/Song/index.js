import styled from 'styled-components';
import Options from '../Options';
import ProgressBar from '../ProgressBar';
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

  const handleOptionClick = (option, optionNumber) => {
    console.log('Successful:', option === props.song);
    props.onOptionClick(option === props.song, option, optionNumber);
  };

  const handleOptionSelected = () => {
    props.onOptionSelect();
  };

  return (
    <Container>
      <h1 className="h1">{t('What is this song?')}</h1>
      <div className="progress">
        { !!props.currentTime && props.duration &&
          <ProgressBar progress={props.currentTime} total={props.duration} />
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