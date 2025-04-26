import React, {useRef, useState} from "react"
import { useNavigate } from "react-router-dom"
import { regex } from "../../shared/Content/regex"

import useFindIdForm from "./model/useFinIdForm"
import useValidatorInput from "../../shared/model/useValidatorInput"

import Header from "../../widget/Header"
import Button from "../../shared/Button"
import s from "./style"

const FindId = () => {
  const navigate = useNavigate()
  const emailRef = useRef()

  const [errors, setErrors] = useState({})

  const validateEmail = useValidatorInput(
    emailRef,
    (value) => regex.email.test(value),
    messages.email
  )
  const {isFindIdSuccess, foundId, handleFindId} = useFindIdForm(validateEmail)

  return (
    <>
    {isFindIdSuccess && 
      <s.Modal>
        <s.ModalTitle>아이디 확인</s.ModalTitle>
        <s.ModalText>회원님의 아이디는 <s.ModalSpan>{foundId}</s.ModalSpan>입니다.</s.ModalText>
        <Button color="primary" size="largeMap" children={"확인"} onClick={() => navigate("/login")} />
      </s.Modal>
    }
    <s.Container>
      <Header 
        headerTitle="아이디 찾기"
        backNavigation={() => navigate('/login')}
      />
      <s.Form>
          <s.InputBox>
            <s.Label>
              이메일 <s.Span>*</s.Span>
            </s.Label>
              <s.Input
                type="email"
                $error={errors.email}
                ref={emailRef}
                placeholder="이메일을 입력해주세요"
              />
            {errors.email && (
              <s.Message>
                {errors.email}
              </s.Message>
            )}
          </s.InputBox>
        <Button 
          type="button" 
          color="primary" 
          size="largeUser" 
          children={"아이디 찾기"} 
          onClick={() => handleFindId(setErrors)} 
        />
      </s.Form>
    </s.Container>
    {isFindIdSuccess && <s.Overlay></s.Overlay>}
    </>
  )
  
}

export default FindId