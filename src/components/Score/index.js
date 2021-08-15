import styled from 'styled-components';
import Share from '../Share';

const Container = styled.div`
  width: 80%;
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
  const handleCanvasRendered = () => {
    props.onLoaded();
  };

  return (
    <Container>
      <h2 className="h2">You hit {props.songs.length} song{props.songs.length === 1 ? '' : 's'}</h2>
      <h3 className="h3">Total points: {props.points}</h3>
      <div className="successful-songs">
        {props.songs.map((song, i) => <div key={i}>{song}</div>)}
      </div>
      <Share
        songs={props.songs}
        points={props.points}
        onCanvasRendered={handleCanvasRendered}
      />
    </Container>
  );
};

export default Score;