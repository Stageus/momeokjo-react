import { useNavigate } from "react-router-dom"
import s from "../../style"
import Button from "../../../../../widget/ui/Button"
import BackIcon from "../../assets/ico-back.svg"
import { useState } from "react"

const LocalSignUp = () => {

  const navigate = useNavigate()
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false)

  return(

    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/login")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼" />
        </s.Back>
        <s.Title>회원가입</s.Title>
        <s.Empty />
      </s.Header>

      
    </s.Container>
  )
}

export default LocalSignUp