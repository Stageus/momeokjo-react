import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";

import useOauthSignupForm from "./model/useOauthSignupForm";
import useSendEmailCode from '../SignUp/model/useSendEmailCode'
import useConfirmEmailCode from "../SignUp/model/useConfirmEmailCode";

import Button from "../../shared/Button";
import Header from "../../widget/Header";
import s from "./style"

const OauthSignup = () => {
  const navigate = useNavigate()
  const nicknameRef = useRef()
  const emailRef = useRef()
  const emailCodeRef = useRef()

  const { 
    requestPostEmailCode, isSending, isEmailSent, timer, formatTime, isValidateEmail
  } = useSendEmailCode()

  const {
    requestPostEmailConfirm, isEmailSuccessful, isValidateEmailCode 
  } = useConfirmEmailCode()

  const { requestPostOauthSignup, isValidateNickname, } = useOauthSignupForm(
    nicknameRef,
    isEmailSuccessful
  )

  const inputList = [
    {
      label: "닉네임",
      type: "text",
      ref: nicknameRef,
      validity: isValidateNickname,
      error_message: "닉네임이 입력 형식에 맞지 않습니다.",
      default_message: "50자 이하 / 한글, 영어, 숫자 포함"
    },
    {
      label: "이메일",
      type: "email",
      ref: emailRef,
      validity: isValidateEmail,
      error_message: "이메일이 입력 형식에 맞지 않습니다.",
      default_message: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태"
    },
  ]

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
                    <s.EmailVerify onClick={() => requestPostEmailCode(emailRef)} disabled={isSending}>
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
                {!elem
                ?
                  <s.Message>
                    {elem?.default_message}
                  </s.Message>
                :
                  <s.Message $error={!elem?.validity}>
                    {elem?.default_message}
                  </s.Message>
                }

              </>
            }
          </s.InputBox>
        ))}

        <Button type="button" color="primary" size="largeUser" children={"회원가입"} onClick={requestPostOauthSignup} />

      </s.Form>
    </s.Container>
  )
}

export default OauthSignup