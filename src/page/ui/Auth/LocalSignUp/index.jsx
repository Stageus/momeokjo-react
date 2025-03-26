import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./style";
import BackIcon from "../assets/ico-back.svg";
// import useSignUpForm from "./model/useSignupForm";
import Button from "../../../../shared/ui/Button";

import useAuthForm from "../../../../widget/Form/model/useAuthForm";

const LocalSignUp = () => {

  const navigate = useNavigate()
  const {
    formType,
    setFormType,
    commonInputFields,
    signUpInputFields,
    errors,
    values,
    handleChange,
    handleSubmit,
    
    // 회원가입 관련
    isEmailCodeSent,
    emailCodeMessage,
    isEmailSuccessful,
    handleSendEmailCode,
    handleConfirmEmailCode,
    formatTime,
    timer,
    expireMessage,
    messages
  } = useAuthForm(navigate)

  React.useEffect(() => {
    setFormType('signup')
  }, [setFormType])

  const onClick = (e) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/login")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼" />
        </s.Back>
        <s.Title>회원가입</s.Title>
        <s.Empty />
      </s.Header>
      <s.Form>
        {/* 공통 입력 필드 */}
        {commonInputFields.map((field, index) => (
          <s.InputBox key={index}>
            <s.Label>
              {field.label} <s.Span>*</s.Span>
            </s.Label>
            <s.Input
              type={field.type}
              $error={!!errors[field.name]}
              onChange={handleChange}
              name={field.name}
              value={values[field.name] || ""}
            />
            <s.Message $error={!!errors[field.name]}>
              {errors[field.name] || messages[field.name] || ""}
            </s.Message>
          </s.InputBox>
        ))}
        {signUpInputFields.map((field, index) => (
            <s.InputBox key={index}>
              <s.Label>
                {field.label} <s.Span>*</s.Span>
              </s.Label>
              {field.label === "이메일" ? (
              <>
                <s.EmailContainer>
                  <s.Input
                    type={field.type}
                    name={field.name}
                    $error={!!errors.email}
                    onChange={handleChange}
                    disabled={isEmailSuccessful}
                  />
                  {!isEmailSuccessful && (
                    <s.EmailVerify onClick={handleSendEmailCode}>
                      {isEmailCodeSent ? "인증번호 재전송" : "이메일 인증번호 전송"}
                    </s.EmailVerify>
                  )}
                </s.EmailContainer>
                <s.Message $error={!!errors.email}>
                  {errors.email || messages.email || ""}
                </s.Message>

                {isEmailCodeSent && (
                <>
                  <s.EmailContainer>
                    <s.Input 
                      type="text"
                      name="emailCode"
                      placeholder="이메일 인증번호 6자리 숫자를 입력해주세요"
                      $error={!!errors.emailCode}
                      $verify
                      value={values.emailCode || ""}
                      onChange={handleChange}
                      disabled={isEmailSuccessful}
                    />
                    {!isEmailSuccessful && ( // 인증 성공 시 인증 확인 버튼 숨김
                      <s.EmailVerify $verify onClick={handleConfirmEmailCode}>인증 확인</s.EmailVerify>
                    )}
                    {!isEmailSuccessful && <s.Timer>{formatTime(timer)}</s.Timer>} {/* 인증 성공 시 타이머 숨김 */}
                  </s.EmailContainer>
                  <s.Message 
                    $error={!!errors.emailCode && !isEmailSuccessful}
                    $success={isEmailSuccessful}
                  >
                    {isEmailSuccessful ? emailCodeMessage : errors.emailCode || expireMessage || ""}
                  </s.Message>
                </>
                )}
              </>
              ) : (
                <>
                  <s.Input 
                    type={field.type} 
                    name={field.name} 
                    value={values[field.name] || ""}
                    $error={!!errors[field.name]} 
                    onChange={handleChange}
                  />
                  <s.Message $error={!!errors[field.name]}>
                    {errors[field.name] || messages[field.name] || ""}
                  </s.Message>
                </>
              )}
            </s.InputBox>
        ))}
        <Button $signup color="primary" size="largeUser" onClick={onClick}>
          회원가입
        </Button>
      </s.Form>
    </s.Container>
  )
}

export default LocalSignUp;