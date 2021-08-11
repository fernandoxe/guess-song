import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .button {
    border: none;
    width: 100%;
    padding: 0.5rem 1rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(211, 194, 154, 0.3);
    font-family: inherit;
    color: inherit;
    font-style: italic;
    font-size: 1rem;
  }
  .clicked--correct {
    background-color: #66bb6a;
  }
  .clicked--incorrect {
    background-color: #ce0000;
  }
`;

const Button = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    if(props.disableEffect) {
      props.onClick?.();
    } else {
      setTimeout(() => {
        props.onClick?.();
        setClicked(false);
      }, 200);
    }
  };

  return (
    <Container>
      <button
        className={`button ${clicked && !props.disableEffect ? (props.correct ? 'clicked--correct' : 'clicked--incorrect') : ''}`}
        onClick={handleButtonClick}
      >
        {props.children}
      </button>
    </Container>
  );
};

export default Button;