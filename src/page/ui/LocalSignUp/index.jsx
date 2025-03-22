import { useNavigate } from "react-router-dom";
import s from "./style";
import BackIcon from "./assets/ico-back.svg";
import useSignUpForm from "./model/useSignupForm";
import Button from "../../../shared/ui/Button";

const LocalSignUp = () => {
  const navigate = useNavigate()
  const {
    inputFields,
    refs,
    errors,
    setErrors,
    messages,
    isEmailCodeSent,
    emailCodeMessage,
    isEmailSuccessful,
    handleSendEmailCode,
    handleConfirmEmailCode,
    formatTime,
    timer,
    emailErrorMessage,
    updateValue,
    values,
    handleSignUp,
    expireMessage,
  } = useSignUpForm({navigate})

  const handleLocalSignUp = (e) => {
    e.preventDefault()
    handleSignUp()
  };

  return (
    <s.Container>
      <s.Header>
        <s.Back onClick={() => navigate("/login")}>
          <s.BackImg src={BackIcon} alt="뒤로가기 버튼" />
        </s.Back>
        <s.Title>회원가입</s.Title>
        <s.Empty />
      </s.Header>
      <s.Form onSubmit={(e) => e.preventDefault()}>
        {inputFields.map((field, index) => {
          const refName = field.refName
          return (
            <s.InputBox key={index}>
              <s.Label>
                {field.label} <s.Span>*</s.Span>
              </s.Label>
              {field.label === "이메일" ? (
              <>
                <s.EmailContainer>
                  <s.Input
                    type={field.type}
                    ref={refs[field.refName]}
                    $error={!!errors["email"] || !!emailErrorMessage}
                    onChange={updateValue(field.refName)}
                    disabled={isEmailSuccessful}
                  />
                  {!isEmailSuccessful && (
                    <s.EmailVerify onClick={handleSendEmailCode}>
                      {isEmailCodeSent ? "인증번호 재전송" : "이메일 인증번호 전송"}
                    </s.EmailVerify>
                  )}
                </s.EmailContainer>
                <s.Message $error={!!errors["email"] || !!emailErrorMessage}>
                  {errors["email"] ? errors["email"] : emailErrorMessage || (messages && messages["email"])}
                </s.Message>

                {isEmailCodeSent && (
                <>
                  <s.EmailContainer>
                    <s.Input 
                      type="text"
                      placeholder="이메일 인증번호 6자리 숫자를 입력해주세요"
                      $error={!!errors["emailCode"]}
                      $verify
                      ref={refs.emailCode}
                      onChange={updateValue("emailCode")}
                      disabled={isEmailSuccessful}
                    />
                    {!isEmailSuccessful && ( // 인증 성공 시 인증 확인 버튼 숨김
                      <s.EmailVerify $verify onClick={handleConfirmEmailCode}>인증 확인</s.EmailVerify>
                    )}
                    {!isEmailSuccessful && <s.Timer>{formatTime(timer)}</s.Timer>} {/* 인증 성공 시 타이머 숨김 */}
                  </s.EmailContainer>
                  <s.Message 
                    $error={!!errors["emailCode"] && !isEmailSuccessful}
                    $success={isEmailSuccessful}
                  >
                    {isEmailSuccessful ? emailCodeMessage : errors["emailCode"] || expireMessage || ""}
                  </s.Message>
                </>
                )}
              </>
              ) : (
                <>
                  <s.Input 
                    type={field.type} 
                    ref={refs[field.refName]} 
                    $error={!!errors[field.refName]} 
                    onChange={updateValue(field.refName)}
                  />
                  <s.Message $error={!!errors[refName]}>
                    {errors[refName] || messages[refName]}
                  </s.Message>
                </>
              )}
            </s.InputBox>
          );
        })}
        <Button $signup color="primary" size="largeUser" onClick={handleLocalSignUp}>
          회원가입
        </Button>
      </s.Form>
    </s.Container>
  );
};

export default LocalSignUp;
