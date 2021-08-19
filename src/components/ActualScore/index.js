import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 10%;
  font-size: 1rem;
  line-height: 1.1rem;
  text-align: right;
`;

const ActualScore = (props) => {
  const { t } = useTranslation();

  return (
    <Container>
      {!props.gameFinished &&
        <>
          <div>{t('X guessed songs', {count: props.songs})}</div>
          <div>{t('Total score', {count: props.score})}</div>
        </>
      }
      <div>{t('High score', {count: props.highScore})}</div>
    </Container>
  );
};

export default ActualScore;