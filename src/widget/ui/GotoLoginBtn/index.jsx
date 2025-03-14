import { useNavigate } from "react-router-dom"
import s from "./style"

function GotoLoginBtn() {

  const navigate = useNavigate()

  return(
    <>
      <s.BtnLogin onClick={() => navigate("/login")}>로그인</s.BtnLogin>
    </>
  )

}

export default GotoLoginBtn