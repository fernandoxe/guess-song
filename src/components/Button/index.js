import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .button {
    border: none;
    padding: 0.5rem 1rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #9d8365;
    font-family: inherit;
    color: inherit;
    font-style: italic;
    font-size: 1.125rem;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
  }
  .option {
    width: 100%;
  }
  .normal {
    background-color: #d3c29a;
    color: #9d8365;
  }
  .correct {
    background-color: #66bb6a;
  }
  .incorrect {
    background-color: #ce0000;
  }
`;

const Button = (props) => {
  const [activeClass, setActiveClass] = useState('');

  const handleButtonClick = () => {
    props.onClick?.();
    setActiveClass(props.type);
    setTimeout(() => {
      setActiveClass('');
      props.onSelect();
    }, 500);
  };

  return (
    <Container>
      <button
        className={`button ${props.type !== 'normal' ? 'option' : ''} ${activeClass}`}
        onClick={handleButtonClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </Container>
  );
};

export default Button;