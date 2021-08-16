import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Share from '../Share';

const Container = styled.div`
  width: 80%;
  max-height: 100vh;
  .h2, .h3 {
    text-align: center;
    margin: 1.5rem 0;
  }
  .successful-songs {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
    font-style: italic;
  }
`;

const Score = (props) => {
  const { t } = useTranslation();
  const handleCanvasRendered = () => {
    props.onLoaded();
  };

  return (
    <Container>
      <h2 className="h2">{t('X guessed songs', {count: props.songs.length})}</h2>
      <h3 className="h3">{t('Total score', {count: props.points})}</h3>
      {props.songs.length > 0 &&
        <div className="successful-songs">
          {props.songs.map((song, i) => <div key={i}>{song}</div>)}
        </div>
      }
      <Share
        songs={props.songs}
        points={props.points}
        onCanvasRendered={handleCanvasRendered}
      />
    </Container>
  );
};

export default Score;