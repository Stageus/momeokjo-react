import React, {useRef} from "react"
import { useNavigate } from "react-router-dom"

import useFindPwForm from "./model/useFindPwForm"

import Header from "../../widget/Header"
import Button from "../../shared/Button"
import s from "./style"

const FindPw = () => {
  const navigate = useNavigate()
  const idRef = useRef()
  const emailRef = useRef()

  const { requestPostFindPw, isValidateId, isValidateEmail } = useFindPwForm(idRef, emailRef)

  const inputList = [
    {
      label : "아이디",
      type : "text",
      ref : idRef,
      validity: isValidateId,
      error_message : "50자 이하 / 영어, 숫자 포함"
    },
    {
      label : "이메일",
      type : "text",
      ref : emailRef,
      validity: isValidateEmail,
      error_message : "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태"
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
        <Button type="button" color="primary" size="largeUser" children={"비밀번호 찾기"} onClick={requestPostFindPw} />
      </s.Form>
    </s.Container>
  )

}

export default FindPw