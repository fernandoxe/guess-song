import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
`;

const Score = (props) => {
  return (
    <Container>
      <h2>You hit {props.songs.length} song{props.songs.length === 1 ? '' : 's'}</h2>
      {props.songs.map((song, i) => <div key={i}>{song}</div>)}
    </Container>
  );
};

export default Score;