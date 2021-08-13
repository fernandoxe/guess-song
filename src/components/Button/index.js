import styled from 'styled-components';

const Container = styled.div`
  .button {
    border: none;
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
  .normal {

  }
  .option {
    width: 100%;
  }
  .clicked--correct {
    background-color: #66bb6a;
  }
  .clicked--incorrect {
    background-color: #ce0000;
  }
`;

const Button = (props) => {
  const handleButtonClick = () => {
    props.onClick?.();
  };

  return (
    <Container>
      <button
        className={`button ${props.type}`}
        onClick={handleButtonClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </Container>
  );
};

export default Button;