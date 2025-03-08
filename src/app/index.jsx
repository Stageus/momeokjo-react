import Page from '../page'
import { ThemeProvider } from "styled-components";
import theme from "./style/theme.js";
import GlobalStyle from './style/global.js'
import ResetStyle from './style/reset.js'

function App() {
  return (
    <>
      <ThemeProvider theme={theme.defaultTheme}>
        <ResetStyle />
        <GlobalStyle />
        <Page></Page>
      </ThemeProvider>
    </>
  )
}

export default App
