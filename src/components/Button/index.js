import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .button {
    border: ${props => props.theme.button.border};
    padding: 0.5rem 1rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: ${props => props.theme.color.backgroundButton};
    font-family: inherit;
    color: ${props => props.theme.color.textButton};
    font-style: italic;
    font-size: 1.125rem;
    box-shadow: ${props => props.theme.button.boxShadow};
  }
  .option {
    width: 100%;
  }
  .normal {
    background-color: ${props => props.theme.color.backgroundNormalButton};
    color: ${props => props.theme.color.normalButtonText};
    border-color: ${props => props.theme.color.buttonBorder};
  }
  .correct {
    background-color: ${props => props.theme.color.successful};
    color: ${props => props.theme.color.correctButtonText};
  }
  .incorrect {
    background-color: ${props => props.theme.color.error};
    color: ${props => props.theme.color.incorrectButtonText};
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