import { useNavigate } from "react-router-dom"
import s from "../../style"
import Button from "../../../../../widget/ui/Button"
import BackIcon from "../../assets/ico-back.svg"
import useSignUpData from "../../model/useSignupData"
import { useState } from "react"

const LocalSignUp = () => {

  const navigate = useNavigate()
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false)
  const {
    inputFields,
    handleSubmit,
    refs,
    verificationCode,
    setVerificationCode,
    sendVerificationCode,
    confirmVerificationCode,
    verificationMessage,
    timer,
    isVerificationSuccessful,
  } = useSignUpData()

  const handleSendVerificationCode = () => {
    sendVerificationCode()
    setIsVerificationCodeSent(true)
  }

  const handleConfirmVerificationCode = async () => {
    await confirmVerificationCode()
  }

  return(

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
          if (field.label === "이메일") {
            return (
              <s.InputBox key={index}>
                <s.Label>
                  {field.label} <s.Span>*</s.Span>
                </s.Label>
                <s.EmailContainer>
                  <s.Input 
                    type={field.type}
                    ref={refs[field.refName]}
                    $error={!!field.error}
                  />
                  <s.EmailVerify onClick={handleSendVerificationCode}>
                    이메일 인증번호 전송
                  </s.EmailVerify>
                </s.EmailContainer>
                
                <s.Message $error={!!field.error}>
                  254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태
                </s.Message>

                {isVerificationCodeSent &&
                <>
                  <s.EmailContainer $verify>
                    <s.Input 
                      $verify
                      type="text"
                      placeholder="이메일 인증번호 6자리 숫자를 입력해주세요"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <s.Timer>{timer}</s.Timer>
                  <s.EmailVerify 
                    $verify 
                    onClick={handleConfirmVerificationCode}
                  >
                    인증번호 확인
                    </s.EmailVerify>
                  </s.EmailContainer>
                  {isVerificationSuccessful === true ? (
                    <s.Message $succes>
                      인증에 성공하였습니다.
                    </s.Message>
                  ) : isVerificationSuccessful === false ? (
                    <s.Message $error>
                      인증번호를 확인해주세요.
                    </s.Message>
                  ) : null}
                </>
                  
                }
              </s.InputBox>
            )
          } else {
            return (
              <s.InputBox key={index}>
                <s.Label>
                  {field.label} <s.Span>*</s.Span>
                </s.Label>
                <s.Input 
                  type={field.type}
                  ref={refs[field.refName]}
                  $error={!!field.error}
                />

                <s.Message $error={!!field.error}>
                  {field.label === "아이디" && "50자 이하 / 영어, 숫자 조합"}
                  {field.label === "비밀번호" && "8~32자 이하, 영대문자 1자 이상, 특수문자 1자 이상, 영소문자, 숫자 조합"}
                  {field.label === "비밀번호 확인" && "비밀번호 입력값과 동일한 번호를 입력해주세요"}
                  {field.label === "닉네임" && "50자 이하 / 한글, 영어, 숫자 포함"}
                  {field.label === "이메일" && "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태"}
                </s.Message>
              </s.InputBox>
            )
          }
        })}
        

        <Button $verify color="primary" size="large_login" onClick={handleSubmit}>회원가입</Button>
      </s.Form>
    </s.Container>
  )
}

export default LocalSignUp