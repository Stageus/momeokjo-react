import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
import { messages, regex } from "../../shared/Content/regex";

import useSignUpForm from "./model/useSignupForm";
import useSendEmailCode from "./model/useSendEmailCode";
import useConfirmEmailCode from "./model/useConfirmEmailCode";

import useValidatorInput from "../../shared/model/useValidatorInput";

import Button from "../../shared/Button"
import Header from "../../widget/Header"
import s from "./style"


const SignUp = () => {
  const navigate = useNavigate()
  const idRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const nicknameRef = useRef()
  const emailRef = useRef()
  const emailCodeRef = useRef()

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

  const validateConfirmPassword = useValidatorInput(
    [passwordRef, confirmPasswordRef],
    ([password, confirmPassword]) => password === confirmPassword && password !== "",
    messages.confirmPassword
  )

  const validateNickname = useValidatorInput(
    nicknameRef,
    (value) => regex.nickname.test(value),
    messages.nickname
  )

  const validateEmail = useValidatorInput(
    emailRef,
    (value) => regex.email.test(value),
    messages.email
  )

  const { 
    handleSendEmailCode, 
    isEmailCodeSent,
    timer,
    formatTime,
    generatedCode } = useSendEmailCode(validateEmail)

  const validateEmailCode = useValidatorInput(
    emailCodeRef,
    (value) => value === generatedCode,
    messages.emailCode
  )

  const {
    isEmailSuccessful,
    emailCodeMessage,
    confirmEmailCode} = useConfirmEmailCode(validateEmailCode)

  

  

  const { errors, values, handleSignUp, pageType, setErrors } = useSignUpForm( 
    idRef,
    passwordRef,
    confirmPasswordRef,
    nicknameRef,
    emailRef,
    emailCodeRef,
    validateId, 
    validatePassword, 
    validateConfirmPassword, 
    validateNickname, 
    validateEmail, 
    validateEmailCode,
    isEmailSuccessful
  )

  const inputList = [
    ...(pageType === "local"
      ? [
          {
            label: "아이디",
            type: "text",
            error_message: errors.id,
            ref: idRef,
            defaultMessage: messages.id
          },
          {
            label: "비밀번호",
            type: "password",
            error_message: errors.password,
            ref: passwordRef,
            defaultMessage: messages.password
          },
          {
            label: "비밀번호 확인",
            type: "password",
            error_message: errors.confirmPassword,
            ref: confirmPasswordRef,
            defaultMessage: messages.confirmPassword
          },
        ]
      : []),
    {
      label: "닉네임",
      type: "text",
      error_message: errors.nickname,
      ref: nicknameRef,
      defaultMessage: messages.nickname
    },
    {
      label: "이메일",
      type: "email",
      error_message: errors.email,
      ref: emailRef,
      defaultMessage: messages.email
    },
  ]
  
    

  // const KAKAO_SIGNUP_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_SIGNUP_REDIRECT_URI}&scope=profile_nickname,account_email`

  return (
    <s.Container>
      <Header 
        headerTitle="회원가입"
        backNavigation={() => navigate('/login')}
      />
      <s.Form>
        {inputList.map((elem, idx) => (
          <s.InputBox key={idx}>
            <s.Label>
              {elem.label} <s.Span>*</s.Span>
            </s.Label>
            {elem.label === "이메일" ? (
            <>
            <s.EmailContainer>
              <s.Input
                type="email"
                $error={errors.email}
                ref={emailRef}
                disabled={isEmailSuccessful}
              />
              {!isEmailSuccessful && (
                <s.EmailVerify onClick={() => handleSendEmailCode(setErrors)}>
                  {isEmailCodeSent ? "인증번호 재전송" : "이메일 인증번호 전송"}
                </s.EmailVerify>
              )}
            </s.EmailContainer>
            <s.Message $error={errors.email || errors.emailVerification}>
              {errors.email || errors.emailVerification || messages.email}
            </s.Message>

            {isEmailCodeSent && (
              <>
                <s.EmailContainer>
                  <s.Input
                    type="number"
                    placeholder="이메일 인증번호 6자리 숫자를 입력해주세요"
                    $error={errors.emailCode}
                    ref={emailCodeRef}
                    $verify
                    disabled={isEmailSuccessful}
                  />
                  {!isEmailSuccessful && (
                    <s.EmailVerify $verify onClick={() => confirmEmailCode(setErrors)}>
                      인증 확인
                    </s.EmailVerify>
                  )}
                  {!isEmailSuccessful && <s.Timer>{formatTime(timer)}</s.Timer>}
                </s.EmailContainer>
                {(isEmailSuccessful || errors.emailCode) && (
                  <s.Message
                    $error={!!errors.emailCode && !isEmailSuccessful}
                    $success={isEmailSuccessful}
                  >
                    {isEmailSuccessful
                      ? emailCodeMessage
                      : errors.emailCode || messages.emailCode
                    }
                  </s.Message>
                )}
                
              </>
            )}
            </>
            ) : (
              <>
                <s.Input
                  type={elem.type}
                  $error={elem.error_message}
                  ref={elem.ref}
                />
                <s.Message $error={elem.error_message}>
                  {elem.error_message || elem.defaultMessage}
                </s.Message>
              </>
            )}
        </s.InputBox>
        ))}
        <Button $signup type="button" color="primary" size="largeUser" children={"회원가입"} onClick={handleSignUp} />
      </s.Form>
    </s.Container>
  )
}

export default SignUp;