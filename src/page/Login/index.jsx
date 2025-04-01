import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import kakaoIcon from "./assets/ico-kakao.svg"
import useLoginForm from "./model/useLoginForm";
import useKakaoLogin from "./model/useKakaoLogin";
import Button from "../../shared/Button"
import Header from "../../widget/Header";



const Login = () => {

  const navigate = useNavigate()
  const {
    errors, 
    values,
    handleLogin, 
    loginInputFields,
  } = useLoginForm()

  const { handleKakaoLoginClick } = useKakaoLogin()

  // 입력값 변경
  const handleInputChange = (e) => {
    const { name, value } = e.target
    values.current[name] = value
  }

  return (
    <s.Container>
      <Header 
        headerTitle="로그인"
        backNavigation={() => navigate('/')}
      />
      <s.Form>
        {loginInputFields.map((field, index) => (
          <s.InputBox key={index}>
            <s.Label>
              {field.label} <s.Span>*</s.Span>
            </s.Label>
              <s.Input
                type={field.type}
                name={field.name}
                $error={!!errors[field.name]}
                onChange={handleInputChange}
                defaultValue={values.current[field.name] || ""}
                placeholder={field.placeholder || ""}
              />
            {errors[field.name] && (
              <s.Message $error={!!errors[field.name]}>
                {errors[field.name]}
              </s.Message>
            )}
          </s.InputBox>
        ))}
        <Button type="button" color="primary" size="largeUser" children={"로그인"} onClick={handleLogin} />
      
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