import useAuthCheck from './model/useAuthCheck.jsx';
import Page from '../page/index'
import { ThemeProvider } from "styled-components";
import GlobalStyle from './style/global.js'
import ResetStyle from './style/reset.js'
import theme from "./style/theme.js";
import { authState } from '../shared/model/atom.jsx';
import { useRecoilValue } from 'recoil'; // ✅ 이 줄 추가

function App() {

  const loading = useAuthCheck()
  const auth = useRecoilValue(authState)

  console.log("App 렌더링 / auth 상태:", auth)

  if (loading || !auth.checked) return <div>로딩 중...</div>

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
