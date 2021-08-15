import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Button from '../../components/Button';
import Game from '../../components/Game';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .start-button {
    font-style: normal;
    font-size: 3rem;
  }
`;

const Home = () => {
  const { t } = useTranslation();
  const [start, setStart] = useState(false);

  const handlePlayClick = () => {
    setStart(true);
  };

  return (
    <Container>
      {!start &&
        <Button onSelect={handlePlayClick} type="normal">
          <div className="start-button">{t('Play')}</div>
        </Button>
      }
      {start &&
        <Game />
      }
    </Container>
  );
};

export default Home;