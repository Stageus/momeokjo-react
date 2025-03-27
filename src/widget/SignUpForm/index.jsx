import React from "react";
import s from "./style"
import BackIcon from "./assets/ico-back.svg"

const SignUpForm = ({
  headerTitle,
  backNavigation,
  inputFields,
  errors,
  values,
  handleChange,
  submitButton,
  children,
  isEmailCodeSent,
  emailCodeMessage,
  isEmailSuccessful,
  handleSendEmailCode,
  handleConfirmEmailCode,
  formatTime,
  timer,
  expireMessage,
  messages,
}) => {
  return (
    <s.Container>
      <s.Header>
        <s.Back onClick={backNavigation}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼" />
        </s.Back>
        <s.Title>{headerTitle}</s.Title>
        <s.Empty />
      </s.Header>
      <s.Form>
        {inputFields.map((field, index) => (
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
        {submitButton}
        {children}
      </s.Form>
    </s.Container>
  )
}

export default SignUpForm