import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import kakaoIcon from "./assets/ico-kakao.svg"
import useLoginForm from "./model/useLoginForm";
import useKakaoLogin from "./model/useKakaoLogin";
import Button from "../../../../shared/ui/Button"
import LogoutBtn from "../../../../shared/ui/LogoutBtn";
import Form from "../../../../widget/Form";



const Login = () => {

  const navigate = useNavigate()
  const {
    errors, 
    values, 
    handleChange, 
    handleLogin, 
    loginInputFields,
  } = useLoginForm(navigate)

  const { handleKakaoLoginClick } = useKakaoLogin();

  const submitButton = (
    <Button type="button" color="primary" size="largeUser" children={"로그인"} onClick={handleLogin} />
  )

  return (
    <Form 
      headerTitle="로그인"
      backNavigation={() => navigate("/")}
      inputFields={loginInputFields}
      errors={errors}
      values={values}
      handleChange={handleChange}
      submitButton={submitButton}
    >
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

      <LogoutBtn />

      <s.SignUp>
        <s.SignUpText>아직 회원이 아닌가요?</s.SignUpText>
        <s.GoToSignUP onClick={() => navigate("/signup")}>회원가입</s.GoToSignUP>
      </s.SignUp>
    </Form>
  )
}

export default Login