import React from "react"
import { useNavigate } from "react-router-dom"
import StyledButton from "./style"

function GotoLoginBtn() {
  const navigate = useNavigate()

  return(
      <StyledButton onClick={() => navigate("/login")}>로그인</StyledButton> 
  )

}

export default GotoLoginBtn