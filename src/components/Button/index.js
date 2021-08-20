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
    background-color: ${props => props.theme.color.primary};
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
    background-color: ${props => props.theme.color.secondary};
    color: ${props => props.theme.color.primary};
  }
  .correct {
    background-color: ${props => props.theme.color.successful};
  }
  .incorrect {
    background-color: ${props => props.theme.color.error};
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