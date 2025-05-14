import React, {useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom"

import useLoginForm from "./model/useLoginForm";
import useKakaoLogin from "./model/useKakaoLogin";

import Header from "../../widget/Header";
import Button from "../../shared/Button"
import s from "./style"

import kakaoIcon from "./assets/ico-kakao.svg"


const Login = () => {
  const navigate = useNavigate()

  const idRef = useRef()
  const passwordRef = useRef()

  const { requestPostLogin, isValidateId, isValidatePassword } = useLoginForm(idRef, passwordRef)
  const { requestKakaoLogin } = useKakaoLogin()


  const inputList = [
    {
      label: "아이디",
      type: "text",
      ref: idRef,
      validity: isValidateId,
      default_message: "50자 이하 / 영어, 숫자 포함",
      placeholder: "아이디를 입력해주세요."
    },
    {
      label: "비밀번호",
      type: "password",
      ref: passwordRef,
      validity: isValidatePassword,
      default_message: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합",
      placeholder: "비밀번호를 입력해주세요."
    },
  ]

  return (
    <s.Container>

      <Header 
        headerTitle="로그인"
        backNavigation={() => navigate('/')}
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
                placeholder={elem?.placeholder}
              />
              {!elem?.validity && (
                <s.Message>
                  {elem.default_message}
                </s.Message>
              )}

          </s.InputBox>
        )}
      <Button type="button" color="primary" size="largeUser" children={"로그인"} onClick={requestPostLogin} />
      
      <Button type="button" color="kakao" size="largeUser" onClick={requestKakaoLogin}>
        <s.KakaoImg src={kakaoIcon} alt="카카오 아이콘" />
        카카오 로그인
      </Button>

      <s.Links>
        <s.LinksText onClick={() => navigate("/find-id")}>
          아이디 찾기
        </s.LinksText> |
        <s.LinksText onClick={() => navigate("/find-pw")}>
          비밀번호 찾기
        </s.LinksText>
      </s.Links>

      <s.SignUp>
        <s.SignUpText>아직 회원이 아닌가요?</s.SignUpText>
        <s.GoToSignUP onClick={() => navigate("/signup")}>회원가입</s.GoToSignUP>
      </s.SignUp>
      </s.Form>
    </s.Container>
  )
}

export default Login