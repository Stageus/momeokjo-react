import React, {useRef} from "react"
import { useNavigate } from "react-router-dom"

import useFindIdForm from "./model/useFinIdForm"

import Header from "../../widget/Header"
import Button from "../../shared/Button"
import s from "./style"

const FindId = () => {
  const navigate = useNavigate()
  const emailRef = useRef()

  const {isFindIdSuccess, isValidateEmail, foundId, requestPostFindId} = useFindIdForm(emailRef)

  const inputList = [
    {
      label: "이메일",
      type: "text",
      ref: emailRef,
      validity: isValidateEmail,
      error_message: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태"
    }
  ]

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
      {inputList.map((elem, idx) => 
          <s.InputBox key={idx}>
            <s.Label>
              {elem.label} <s.Span>*</s.Span>
            </s.Label>
              <s.Input
                type={elem?.type}
                $error={!elem?.validity}
                ref={elem?.ref}
              />
            {!elem.validity && (
              <s.Message>
                {elem.error_message}
              </s.Message>
            )}
          </s.InputBox>
        )}
        <Button 
          type="button" 
          color="primary" 
          size="largeUser" 
          children={"아이디 찾기"} 
          onClick={requestPostFindId} 
        />
      </s.Form>
    </s.Container>
    {isFindIdSuccess && <s.Overlay></s.Overlay>}
    </>
  )
  
}

export default FindId