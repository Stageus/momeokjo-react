import { useState, useEffect } from "react"

const useSendEmailCode = (validateEmail) => {
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("123456")
  const [timer, setTimer] = useState(900)
  const [emailCodeMessage, setEmailCodeMessage] = useState('')


  const handleSendEmailCode = (setErrors) => {
    const emailError = validateEmail()

    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }))
      return
    }

    setErrors((prev) => {
      const updated = { ...prev }
      delete updated.email
      delete updated.validateEmail
      return updated
    })

    setIsEmailCodeSent(true)
    setEmailCodeMessage("")
    alert(`인증 코드가 전송되었습니다.: ${generatedCode}`)
    setTimer(900)    
  }

  useEffect(() => {
    let interval

    if (isEmailCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000);
    } else if (timer === 0) {
      setIsEmailCodeSent(false)
      setEmailCodeMessage("타이머가 만료되었습니다. 인증 코드를 다시 요청하세요.")
    }

    return () => clearInterval(interval)
  }, [isEmailCodeSent, timer])

  // 타이머 포맷팅 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return { handleSendEmailCode, isEmailCodeSent, emailCodeMessage, timer, formatTime, generatedCode }
}

export default useSendEmailCode