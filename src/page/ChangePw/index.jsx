import React, {useRef, useState} from "react"
import { useNavigate } from "react-router-dom"
import { messages, regex } from "../../shared/Content/regex"

import useChangePwForm from "./model/useChangePwForm"
import useValidatorInput from "../../shared/model/useValidatorInput"

import Header from "../../widget/Header"
import Button from "../../shared/Button"
import s from "./style"


const ChangePw = () => {
  const navigate = useNavigate()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const [errors, setErrors] = useState({})

  const validatePassword = useValidatorInput(
    passwordRef, 
    (value) => regex.password.test(value),
    messages.password
  )
  
  const validateConfirmPassword = useValidatorInput(
    [passwordRef, confirmPasswordRef],
    ([password, confirmPassword]) => password === confirmPassword && password !== "",
    messages.confirmPassword
  )

  const handleChangePw = useChangePwForm(validatePassword, validateConfirmPassword)

  const inputList = [
    {
      "label": "비밀번호",
      "type": "password",
      "error_message": errors.password,
      "ref" : passwordRef
    },
    {
      "label": "비밀번호 확인",
      "type": "password",
      "error_message": errors.confirmPassword,
      "ref": confirmPasswordRef
    },
  ]

  return (
    <s.Container>
      <Header 
        headerTitle="비밀번호 변경"
        backNavigation={() => navigate('/find-pw')}
      />
      <s.Form>

        {inputList.map((elem, idx) => 
          <s.InputBox key={idx}>
            <s.Label>
              {elem.label} <s.Span>*</s.Span>
            </s.Label>
              <s.Input
                type={elem.type}
                $error={elem.error_message}
                ref={elem.ref}
              />
            {elem.error_message && (
              <s.Message>
                {elem.error_message}
              </s.Message>
            )}
          </s.InputBox>
        )}

        <Button type="button" color="primary" size="largeUser" children={"비밀번호 변경"} onClick={() => handleChangePw(setErrors)} />

      </s.Form>
    </s.Container>
  )
}

export default ChangePw