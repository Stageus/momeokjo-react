import React, {useRef, useState} from "react"
import { useNavigate } from "react-router-dom"
import { messages, regex } from "../../shared/Content/regex";

import useLoginForm from "./model/useLoginForm";
import useValidatorInput from "../../shared/model/useValidatorInput";
import useKakaoLogin from "./model/useKakaoLogin";

import Header from "../../widget/Header";
import Button from "../../shared/Button"
import s from "./style"

import kakaoIcon from "./assets/ico-kakao.svg"


const Login = () => {
  const navigate = useNavigate()
  const idRef = useRef()
  const passwordRef = useRef()

  const [errors, setErrors] = useState({})

  const validateId = useValidatorInput(
    idRef,
    (value) => regex.id.test(value),
    messages.id
  )

  const validatePassword = useValidatorInput(
    passwordRef,
    (value) => regex.password.test(value),
    messages.password
  )

  const handleLogin = useLoginForm(validateId, validatePassword)

  const { handleKakaoLoginClick } = useKakaoLogin()

  const inputList = [
    {
      "label": "아이디",
      "type": "text",
      "error_message": errors.id,
      "ref" : idRef,
      "placeholder" : "아이디를 입력해주세요"
    },
    {
      "label": "비밀번호",
      "type": "password",
      "error_message": errors.password,
      "ref": passwordRef,
      "placeholder" : "비밀번호를 입력해주세요"
    },
  ]

  // const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI}&scope=profile_nickname,account_email&prompt=login`;

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
                type={elem.type}
                $error={elem.error_message}
                ref={elem.ref}
                placeholder={elem.placeholder}
              />
            {elem.error_message && (
              <s.Message>
                {elem.error_message}
              </s.Message>
            )}
        </s.InputBox>
      )}
      <Button type="button" color="primary" size="largeUser" children={"로그인"} onClick={() => handleLogin(setErrors)} />
      
      <Button type="button" color="kakao" size="largeUser" onClick={handleKakaoLoginClick}>
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