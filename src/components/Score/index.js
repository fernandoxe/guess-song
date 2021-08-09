import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  .h2 {
    text-align: center;
  }
`;

const Score = (props) => {
  return (
    <Container>
      <h2 className="h2">You hit {props.songs.length} song{props.songs.length === 1 ? '' : 's'}</h2>
      <div>
        {props.songs.map((song, i) => {
          return `${song} ${i + 1 === props.songs.length ? '' : ' - '}`;
        })}
      </div>
    </Container>
  );
};

export default Score;