import { createGlobalStyle } from 'styled-components';
import background from './img/background.jpg';

export const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${props => props.theme.color.background};
    color: ${props => props.theme.color.text};
    font-family: ${props => props.theme.font.family};
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${background}) 53% center/cover no-repeat fixed;
    z-index: -1;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;
