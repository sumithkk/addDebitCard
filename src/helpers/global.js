import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

#root {
  max-width: 100%;
  margin: 0 auto;
}
html {
  font-family: Tahoma, Sans-Serif;
}

body{
  background-color: #1d2636;
}

h1 {
  line-height: 1.4;
}
p {
  line-height: 1.3;
}
`;
