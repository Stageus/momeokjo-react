import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
      color:  ${props => props.theme.textcolor};
      background-color: ${props  => props.theme.backgroundcolor};
  }
`

export default GlobalStyles