import useValidation from "./useValidation"
import { useState, useRef, useEffect } from "react"

function useSignUpData() {

  const { refs, errors, handleSubmit } = useValidation("signup")
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationMessage, setVerificationMessage] = useState("")
  const [isSendingVerificationCode, setIsSendingVerificationCode] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [timer, setTimer] = useState(900)
  const [isRunning, setIsRunning] = useState(false)
  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(null)
  const timerId = useRef(null)

  const inputFields = [
    {
      label: "아이디",
      type: "text",
      refName: "idRef",
      error: errors.id,
    },
    {
      label: "비밀번호",
      type: "password",
      refName: "passwordRef",
      error: errors.password,
    },
    {
      label: "비밀번호 확인",
      type: "password",
      refName: "confirmPasswordRef",
      error: errors.confirmPassword,
    },
    {
      label: "닉네임",
      type: "text",
      refName: "nicknameRef",
      error: errors.nickname,
    },
    {
      label: "이메일",
      type: "email",
      refName: "emailRef",
      error: errors.email,
    },
  ]

  const startTimer = () => {
    setIsRunning(true)
    timerId.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000)
  }

  const stopTimer = () => {
    setIsRunning(false)
    clearInterval(timerId.current)
  }

  const resetTimer = () => {
    stopTimer()
    setTimer(900)
  }

  useEffect(() => {
    if (timer <= 0 && isRunning) {
      stopTimer()
      setVerificationMessage("인증 시간이 만료되었습니다.")
    }
  }, [timer, isRunning])

  useEffect(() => {
    return () => clearInterval(timerId.current)
  }, [])

  const sendVerificationCode = async () => {
    setIsSendingVerificationCode(true)
    try {
      const email = refs.emailRef.current.value
      setVerificationMessage("이메일 인증번호가 전송되었습니다.")
      startTimer()
    } catch (error) {
      console.error("이메일 전송 실패:", error)
      setVerificationMessage("이메일 전송에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSendingVerificationCode(false)
    }
  }

  const confirmVerificationCode = async () => {
    setIsVerifyingCode(true)
    try {
    //   // ** 실제 인증 로직 구현 필요 **
    //   const response = await fetch("/api/verify-code", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: refs.emailRef.current.value,
    //       code: verificationCode,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })

    //   const data = await response.json();

    //   if (data.success) {
    //     // 인증 성공
    //     setVerificationMessage("인증되었습니다.")
    //     setIsVerificationSuccessful(true)
    //   } else {
    //     // 인증 실패
    //     setVerificationMessage("인증에 실패했습니다.")
    //     setIsVerificationSuccessful(false)
    //   }
    // } catch (error) {
    //   console.error("인증번호 확인 실패:", error)
    //   setVerificationMessage("인증에 실패했습니다.")
    //   setIsVerificationSuccessful(false)
    // } finally {
    //   setIsVerifyingCode(false)
    // }

    if (verificationCode === "123456") {
      // 인증 성공
      setVerificationMessage("인증되었습니다.")
      setIsVerificationSuccessful(true)
    } else {
      // 인증 실패
      setVerificationMessage("인증에 실패했습니다.")
      setIsVerificationSuccessful(false)
    }
    } catch (error) {
      console.error("인증번호 확인 실패:", error)
      setVerificationMessage("인증에 실패했습니다.")
      setIsVerificationSuccessful(false)
    } finally {
      setIsVerifyingCode(false)
    }
  }
  

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60

  return {
    inputFields,
    handleSubmit,
    refs,
    verificationCode,
    setVerificationCode,
    sendVerificationCode,
    confirmVerificationCode,
    verificationMessage,
    isSendingVerificationCode,
    isVerifyingCode,
    timer: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
    isVerificationSuccessful,
  };
}

export default useSignUpData

