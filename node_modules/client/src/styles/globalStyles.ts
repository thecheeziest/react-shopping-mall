import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  #root {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 10px;
  }
  
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
`;
