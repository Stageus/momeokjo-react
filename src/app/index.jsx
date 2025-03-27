import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Page from '../page'
import Login from '../page/ui/Auth/Login'
import { ThemeProvider } from "styled-components";
import theme from "./style/theme.js";
import GlobalStyle from './style/global.js'
import ResetStyle from './style/reset.js'
import LocalSignUp from "../page/ui/Auth/LocalSignUp"
import FindId from "../page/ui/Auth/FindId/index.jsx";
import Findpw from "../page/ui/Auth/FindPw/index.jsx"
import ChangePw from "../page/ui/Auth/ChangePw/index.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={{ ...theme.defaultTheme, fontSet: theme.fontSet }}>
        <ResetStyle />
        <GlobalStyle />
        <RecoilRoot>
          <Router>
            <Routes>
              <Route path="find-id" element={<FindId />} />
              <Route path="find-pw" element={<Findpw />} />
              <Route path="change-pw" element={<ChangePw />} />
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
