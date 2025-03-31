import Page from '../page/index'
import { ThemeProvider } from "styled-components";
import GlobalStyle from './style/global.js'
import ResetStyle from './style/reset.js'
import theme from "./style/theme.js";

function App() {
  return (
    <>
      <ThemeProvider theme={{ ...theme.defaultTheme, fontSet: theme.fontSet }}>
        <GlobalStyle />
        <ResetStyle />
        <Page />
      </ThemeProvider>
    </>
  )
}

export default App
