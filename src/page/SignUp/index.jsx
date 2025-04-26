import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";

import useSignUpForm from "./model/useSignupForm";
import useSendEmailCode from "./model/useSendEmailCode";
import useConfirmEmailCode from "./model/useConfirmEmailCode";

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

  // const validateId = useValidatorInput(idRef, regex.id)
  // const validatePassword = useValidatorInput(passwordRef, regex.password)
  // const validateConfirmPassword = () => {
  //   const passwordValue = passwordRef?.current?.value
  //   const confirmPassowrdValue = confirmPasswordRef?.current?.value

  //   return  passwordValue === confirmPassowrdValue ? true : false
  // }
  // const validateNickname = useValidatorInput(nicknameRef, regex.nickname)
  // const validateEmail = useValidatorInput(emailRef, regex.email)
  // const validateEmailCode = useValidatorInput(emailCodeRef, regex.emailCode)

  // 위에 잇는 것들은 true / false 만 주는 코드들 ( message 라는 변수의 종류를 1개로 변경하고, 함수들끼리의 종속 관계를 없앤 것 )

  // 최종적으로 위 6개 변수가 여기에 있으면 안됨 ( useSignupForm예 잇어야 함 )
  // 값을 입력할 때 체크하는게 아니라, 회원가입을 시도할 때 체크하는 것이니깐



  const { 
    requestPostEmailCode, isSending, isEmailSent, timer, formatTime, isValidateEmail
  } = useSendEmailCode()

  const {
    requestPostEmailConfirm, isEmailSuccessful, isValidateEmailCode 
  } = useConfirmEmailCode()

  const { 
    requestPostSignup, isValidateId, isValidatePassword, isValidateNickname, isComparePassword 
  } = useSignUpForm( 
    idRef,
    passwordRef,
    confirmPasswordRef,
    nicknameRef,
    isEmailSuccessful
  )

  // 여기에 있는 모든 함수들이 종속 관계를 가짐 ( 한 방향으로 흘러간느 종속 관계가 아님 )
  // 어디에 이 변수가 있는건지, 이 변수를 어디로 보내줘야하는지 알 수가 없음

  const inputList = [
          {
            label: "아이디",
            type: "text",
            // error_message: errors.id,
            ref: idRef,
            // defaultMessage: messages.id
            validity: isValidateId,
            error_message: "아이디가 입력 형식에 맞지 않습니다.",
            default_message: "50자 이하 / 영어, 숫자 포함"
          },
          {
            label: "비밀번호",
            type: "password",
            // error_message: errors.password,
            ref: passwordRef,
            // defaultMessage: messages.password
            validity: isValidatePassword,
            error_message: "비밀번호가 입력 형식에 맞지 않습니다.",
            default_message: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합"
          },
          {
            label: "비밀번호 확인",
            type: "password",
            // error_message: errors.confirmPassword,
            ref: confirmPasswordRef,
            // defaultMessage: messages.confirmPassword
            validity: isComparePassword, 
            error_message: "두 비밀번호가 일치하지 않습니다.",
            default_message: "비밀번호와 동일한 값 혹은 여백이 있으면 안됩니다."
          },
          {
            label: "닉네임",
            type: "text",
            // error_message: errors.nickname,
            ref: nicknameRef,
            // defaultMessage: messages.
            validity: isValidateNickname,
            error_message: "닉네임이 입력 형식에 맞지 않습니다.",
            default_message: "50자 이하 / 한글, 영어, 숫자 포함"
          },
          {
            label: "이메일",
            type: "email",
            // error_message: errors.email,
            ref: emailRef,
            // defaultMessage: messages.email
            validity: isValidateEmail,
            error_message: "이메일이 입력 형식에 맞지 않습니다.",
            default_message: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태"
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

            {elem.label === "이메일"
              ? <>
                <s.EmailContainer>
                  <s.Input
                    type={elem?.type}
                    $error={!elem?.validity}
                    ref={elem?.ref}
                    disabled={isEmailSuccessful}
                  />
                  {!isEmailSuccessful && (
                    <s.EmailVerify onClick={() => requestPostEmailCode(emailRef)} >
                      {isEmailSent ? "인증번호 재전송" : "이메일 인증번호 전송"}
                    </s.EmailVerify>
                  )}
                </s.EmailContainer>

                <s.Message>
                  {elem?.default_message}
                </s.Message>

                {!elem?.validity &&
                  <s.Message $error={!elem?.validity}>
                    {elem?.error_message}
                  </s.Message>
                }

                {isEmailSent && (
                  <>
                    <s.EmailContainer>
                      <s.Input
                        type="text"
                        placeholder="이메일 인증번호 6자리 숫자를 입력해주세요"
                        $error={!isValidateEmailCode}
                        ref={emailCodeRef}
                        $verify
                        disabled={isEmailSuccessful}
                      />

                      {!isEmailSuccessful && 
                        <>
                          <s.EmailVerify $verify onClick={() => requestPostEmailConfirm(emailCodeRef)}>
                            인증 확인
                          </s.EmailVerify>
                          <s.Timer>{formatTime(timer)}</s.Timer>
                        </>
                      }

                    </s.EmailContainer>

                    <s.Message
                      $error={!isValidateEmailCode}
                      $success={isEmailSuccessful}
                    >
                      {isEmailSuccessful
                        ? "인증에 성공하였습니다."
                        : "인증번호가 올바르지 않습니다."
                      }
                    </s.Message>
                    
                  </>
                )}
              </>
              : <>
                <s.Input
                  type={elem?.type}
                  $error={!elem?.validity}
                  ref={elem?.ref}
                />
                
                <s.Message>
                  {elem?.default_message}
                </s.Message>

                {!elem?.validity &&
                  <s.Message $error={!elem?.validity}>
                    {elem?.error_message}
                  </s.Message>
                }

              </>
            }
          </s.InputBox>
        ))}

        <Button $signup type="button" color="primary" size="largeUser" children={"회원가입"} onClick={requestPostSignup} />

      </s.Form>
    </s.Container>
  )
}

export default SignUp;