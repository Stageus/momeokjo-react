import React, { useRef } from "react";
import useValidation from "./useValidation";
import Button from '../../../../widget/ui/Button';
import s from "./style"

const SignupForm = () => {
  const idRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const nicknameRef = useRef(null)
  const emailRef = useRef(null)

  const refs = { idRef, passwordRef, confirmPasswordRef, nicknameRef, emailRef }
  const { errors, handleSubmit } = useValidation("signup", refs)

  const signupEvent = async () => {
    // 유효성 검사 통과 시 API 호출
    if (await handleSubmit()) {
      const endpoint = "/api/signup"

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idRef.current.value,
            password: passwordRef.current.value,
            nickname: nicknameRef.current.value,
            email: emailRef.current.value,
          }),
        })

        const result = await response.json()

        switch (response.status) {
          case 200:
            alert("회원가입에 성공하였습니다.")
            break
          case 400:
            alert("입력값에 문제가 있습니다.")
            break
          case 409:
            alert("이미 존재하는 아이디 입니다.")
            break
          case 500:
            alert("알 수 없는 오류로 동작할 수 없습니다.")
            break
          default:
            alert(`알 수 없는 상태 코드: ${response.status}`)
            break
        }
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error)
        alert("회원가입 중 에러가 발생했습니다.")
      }
    } else {
      alert("입력값을 다시 확인해주세요.")
    }
  }

    const inputFields = [
      { label: "아이디", type: "text", refName: "idRef", error: errors.id },
      { label: "비밀번호", type: "password", refName: "passwordRef", error: errors.password },
      { label: "비밀번호 확인", type: "password", refName: "confirmPasswordRef", error: errors.confirmPassword },
      { label: "닉네임", type: "text", refName: "nicknameRef", error: errors.nickname },
      { label: "이메일", type: "email", refName: "emailRef", error: errors.email },
    ]
  
    const handleSendVerificationCode = () => {
      console.log("이메일 인증번호 전송")
    }
  
    const handleConfirmVerificationCode = () => {
      console.log("인증번호 확인")
    }

    const [isVerificationCodeSent, setIsVerificationCodeSent] = React.useState(false)
    const [verificationCode, setVerificationCode] = React.useState("")
    const [timer, setTimer] = React.useState("3:00")
    const [isVerificationSuccessful, setIsVerificationSuccessful] = React.useState(null)

  return (
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
        

        <Button $signup color="primary" size="largeUser" onClick={signupEvent}>회원가입</Button>
      </s.Form>
  )
}

export default SignupForm
