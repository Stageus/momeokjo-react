import { useState, useEffect } from "react"
import useFetch from "../../../entities/model/useFetch"
import useValidatorInput from "../../../shared/model/useValidatorInput"
import { regex } from "../../../shared/Content/regex"

const useSendEmailCode = () => {
  const [timer, setTimer] = useState(900)

  const [isSending, setIsSending] = useState(false)   // 이메일 전송 중인 것을 표현하기 위한 상태 ( 만약에 화면에 전송 중인 것을 보여주지 않으면 필요 없는 상태 )
  const [isEmailSent, setIsBackendRequest] = useState(false)   // 백엔드 통신 성공 여부 상태
  const [isValidateEmail, setIsValidateEmail] = useState(true)  // reuquestPostEmailCode 안에서 validateEmailResult가 동작하는 구조 따라서 이 결과 값에 대한 변수를 갖다 쓰려면 state로 빼줘야 한다

  const postData = useFetch()


  const requestPostEmailCode = async (emailRef) => {
    
    const validateEmailResult = useValidatorInput(emailRef, regex.email)
    setIsValidateEmail(validateEmailResult)

    if (validateEmailResult) {

      setIsSending(true)

      const response = await postData("POST", "/auth/verify-email", { 
        email: emailRef.current.value 
      })

      if (response.status === 400) {
        alert("인증번호가 일치하지 않습니다.")
      } 
      else if (response.status === 409) {
        alert("이미 가입된 이메일이 존재합니다.")
      }
      else if (response.status === 200) {
        setIsBackendRequest(true)
        setTimer(900)
      }
      
      setIsSending(false)
    }
  }

  useEffect(() => {
    let interval

    if (isEmailSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000);
    } else if (timer === 0) {
      setIsEmailCodeSent(false)
      setEmailCodeMessage("타이머가 만료되었습니다. 인증 코드를 다시 요청하세요.")
    }

    return () => clearInterval(interval)
  }, [isEmailSent, timer])

  // 타이머 포맷팅 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return { requestPostEmailCode, isSending, isEmailSent, timer, formatTime, isValidateEmail }
}

export default useSendEmailCode