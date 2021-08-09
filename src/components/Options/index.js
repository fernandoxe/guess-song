import { useState } from 'react';
import Button from '../Button';

const Options = (props) => {
  const [disabledButtons, setDisabledButtons] = useState(false);

  const handleOptionClick = (option) => {
    setDisabledButtons(true);
    props.onOptionSelect(option);
  };

  return (
    <ul className="options">  
      {props.options.map((option, i) => {
        return (
          <li
            key={i}
            className="option"
          >
            <Button
              className="option-button"
              correct={props.song === option}
              onClick={() => handleOptionClick(option)}
              disabled={disabledButtons}
            >
              {option}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default Options;