import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './styles';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
}

export default App;
