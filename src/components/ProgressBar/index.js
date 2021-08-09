import styled from 'styled-components';

const Container = styled.div`
  .total {
    
  }
  .progress {
    height: 100%;
    background-color: #e1d3bb;
  }
`;

const ProgressBar = (props) => {
  const progress = props.progress * 100 / props.total;

  return (
    <Container>
      <div className="total">
        <div className="progress" style={{width: `${progress}%`}}></div>
      </div>
    </Container>
  );
};

export default ProgressBar;