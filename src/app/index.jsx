import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Page from '../page'
import Login from '../page/ui/Login'
import { ThemeProvider } from "styled-components";
import theme from "./style/theme.js";
import GlobalStyle from './style/global.js'
import ResetStyle from './style/reset.js'
import LocalSignUp from "../page/ui/Login/ui/LocalSignUp/index.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme.defaultTheme}>
        <ResetStyle />
        <GlobalStyle />
        <RecoilRoot>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<LocalSignUp />} />
              <Route path="/*" element={<Page />} />
            </Routes>
          </Router>
        </RecoilRoot>
      </ThemeProvider>
    </>
  )
}

export default App
