import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  .options {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .option-button {
    width: 100%;
  }
`;

const Song = (props) => {
  console.log(props);

  const handleOptionClick = (option) => {
    console.log('Successful:', option === props.song);
    props.onOptionSelect(option === props.song);
  };

  return (
    <Container>
      <div>
        {/* {props.song} */}
        <audio src={props.song} autoPlay />
      </div>
      <ul className="options">  
        {props.options.map((option, i) => {
          return (
            <li
              key={i}
              onClick={() => handleOptionClick(option)}
            >
              <button className="option-button">
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Song;