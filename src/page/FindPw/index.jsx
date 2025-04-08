import React, {useRef, useState} from "react"
import { useNavigate } from "react-router-dom"
import { messages, regex } from "../../shared/Content/regex"

import useFindPwForm from "./model/useFindPwForm"
import useValidatorInput from "../../shared/model/useValidatorInput"

import Header from "../../widget/Header"
import Button from "../../shared/Button"
import s from "./style"

const FindPw = () => {
  const navigate = useNavigate()
  const idRef = useRef()
  const emailRef = useRef()

  const [errors, setErrors] = useState({})

  const validateId = useValidatorInput(
    idRef,
    (value) => regex.id.test(value),
    messages.id
  )

  const validateEmail = useValidatorInput(
    emailRef,
    (value) => regex.email.test(value),
    messages.email
  )
  const handleFindPw = useFindPwForm(validateId, validateEmail)

  const inputList = [
    {
      "label" : "아이디",
      "type" : "text",
      "error_message" : errors.id,
      "ref" : idRef
    },
    {
      "label" : "이메일",
      "type" : "email",
      "error_message" : errors.email,
      "ref" : emailRef
    },
  ]

  return(
    <s.Container>
      <Header 
        headerTitle="비밀번호 찾기"
        backNavigation={() => navigate('/login')}
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
        <Button type="button" color="primary" size="largeUser" children={"비밀번호 찾기"} onClick={() => handleFindPw(setErrors)} />
      </s.Form>
    </s.Container>
  )

}

export default FindPw