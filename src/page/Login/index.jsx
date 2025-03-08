import s from "./style"
import BackImg from "./assets/ico-back.svg"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  return (
    <>
      <s.Login>
        <s.Header>
          <s.BtnBack onClick={() => navigate(-1)}><s.BackImg src={BackImg} alt="뒤로가기 버튼" /></s.BtnBack>
          <s.Title>로그인</s.Title>
        </s.Header>
      </s.Login>
    </>
  )
}

export default Login
 