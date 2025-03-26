import React from "react"
import { useNavigate } from "react-router-dom"
import s from "./style"
import BackIcon from "../assets/ico-back.svg"
import kakaoIcon from "./assets/ico-kakao.svg"
// import useLoginForm from "./model/useLoginForm";
import Button from "../../../../shared/ui/Button"

import useAuthForm from "../../../../widget/Form/model/useAuthForm"



const Login = () => {

  const navigate = useNavigate()
  const {
    formType,
    setFormType,
    commonInputFields,
    errors,
    values,
    handleChange,
    handleSubmit,
  } = useAuthForm(navigate)

  React.useEffect(() => {
    setFormType('login')
  }, [setFormType])

  const onClick = (e) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼"/>
        </s.Back>
        <s.Title>로그인</s.Title>
        <s.Empty></s.Empty>
      </s.Header>
      <s.Form>
        {commonInputFields.map((field, index) => (
          <s.InputBox key={index}>
          <s.Label>
            {field.label} <s.Span>*</s.Span>
          </s.Label>
          <s.Input 
            type={field.type}
            $error={!!errors[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
            name={field.name}
            value={values[field.name] || ""}
          />
          {errors[field.name] && (
            <s.Message $error={!!errors[field.name]}>
              {errors[field.name]}
            </s.Message>
          )}
        </s.InputBox>
        ))}

        <Button color="primary" size="largeUser" children={"로그인"} onClick={onClick} />
        <Button color="kakao" size="largeUser" >
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