import React, {useRef} from "react"
import { useNavigate } from "react-router-dom"

import useChangePwForm from "./model/useChangePwForm"

import Header from "../../widget/Header"
import Button from "../../shared/Button"
import s from "./style"


const ChangePw = () => {
  const navigate = useNavigate()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const {requestPutChangePw, isValidatePassword, isComparePassword} = useChangePwForm(passwordRef, confirmPasswordRef)

  const inputList = [
    {
      label: "비밀번호",
      type: "password",
      ref: passwordRef,
      validity: isValidatePassword,
      error_message: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합",
    },
    {
      label: "비밀번호 확인",
      type: "password",
      ref: confirmPasswordRef,
      validity: isComparePassword,
      error_message: "비밀번호와 동일한 값 혹은 여백이 있으면 안됩니다.",
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

        <Button type="button" color="primary" size="largeUser" children={"비밀번호 변경"} onClick={requestPutChangePw} />

      </s.Form>
    </s.Container>
  )
}

export default ChangePw