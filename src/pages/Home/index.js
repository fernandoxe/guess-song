import { useState } from 'react';
import styled from 'styled-components';
import Game from '../../components/Game';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const [start, setStart] = useState(false);

  const handlePlayClick = () => {
    setStart(true);
  };

  return (
    <Container>
      {!start &&
        <button onClick={handlePlayClick}>Play</button>
      }
      {start &&
        <Game />
      }
    </Container>
  );
};

export default Home;