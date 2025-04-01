import React from "react";
import { useNavigate } from "react-router-dom";
import useSignUpForm from "./model/useLocalSignupForm";
import Button from "../../shared/ui/Button";
import Header from "../../widget/Header"
import s from "./style"


const SignUp = () => {

  const navigate = useNavigate()
  const {
    errors,
    values,
    handleChange,
    isEmailCodeSent,
    emailCodeMessage,
    isEmailSuccessful,
    handleSendEmailCode,
    handleConfirmEmailCode,
    formatTime,
    timer,
    expireMessage,
    messages,
    signUpInputFields,
    handleSignUp,
  } = useSignUpForm()

  return (
    <s.Container>
      <Header 
        headerTitle="회원가입"
        backNavigation={() => navigate('/')}
      />
      <s.Form>
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
                        <s.EmailVerify $verify onClick={handleConfirmEmailCode}>
                          인증 확인
                        </s.EmailVerify>
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
        <Button $signup type="button" color="primary" size="largeUser" children={"회원가입"} onClick={handleSignUp} />
      </s.Form>
    </s.Container>
  )
}

export default SignUp;