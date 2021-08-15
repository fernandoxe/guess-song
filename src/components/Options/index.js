import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Container = styled.div`
  .options {
    list-style-type: none;
    margin: 0;
    padding: 0;

    .option:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const Options = (props) => {
  const [disabledButtons, setDisabledButtons] = useState(false);

  const handleOptionClick = () => {
    setDisabledButtons(true);
  };

  const handleOptionSelect = (option, optionNumber) => {
    props.onOptionSelect(option, optionNumber);
  };

  return (
    <Container>
      <ul className="options">  
        {props.options.map((option, i) => {
          return (
            <li
              key={i}
              className="option"
            >
              <Button
                className="option-button"
                type={props.song === option ? 'correct' : 'incorrect'}
                clickColor={'#66bb6a'}
                onClick={handleOptionClick}
                onSelect={() => handleOptionSelect(option, i)}
                disabled={disabledButtons}
              >
                {option}
              </Button>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Options;