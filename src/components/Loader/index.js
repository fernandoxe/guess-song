import styled, { keyframes } from 'styled-components';
import background from '../../img/background.jpg';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.color.background} url(${background}) 53% center/cover no-repeat fixed;
  .circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 0.4rem solid ${props => props.theme.color.loader};
    border-top: 0.4rem solid transparent;
    animation: ${rotate} 0.7s linear infinite;
  }
`;

const Loader = () => {
  return (
    <Container>
      <div className="circle"></div>
    </Container>
  );
};

export default Loader;