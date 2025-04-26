import { useState, useEffect } from "react"
import useFetch from "../../../entities/model/useFetch"
import useValidatorInput from "../../../shared/model/useValidatorInput"
import { regex } from "../../../shared/Content/regex"

const useSendEmailCode = () => {
  // const [isEmailCodeSent, setIsEmailCodeSent] = useState(false)
  const [timer, setTimer] = useState(900)
  // const [emailCodeMessage, setEmailCodeMessage] = useState('')

  const [isSending, setIsSending] = useState(false)   // 이메일 전송 중인 것을 표현하기 위한 상태 ( 만약에 화면에 전송 중인 것을 보여주지 않으면 필요 없는 상태 )
  const [isEmailSent, setIsBackendRequest] = useState(false)   // 백엔드 통신 성공 여부 상태
  // const [emailSentResultMessage, setBackendMeesage] = useState("")   // 백엔드 통신이 실패했을 때 출력할 메세지 상태
  const [isValidateEmail, setIsValidateEmail] = useState(true)

  const postData = useFetch()


  const requestPostEmailCode = async (emailRef) => {
    
    const validateResult = useValidatorInput(emailRef, regex.email)
    setIsValidateEmail(validateResult)

    // setErrors((prev) => {
    //   const updated = { ...prev }
    //   delete updated.email
    //   return updated
    // })

    // try {
    if (validateResult) {

      setIsSending(true)

      const response = await postData("POST", "/auth/verify-email", { 
        email: emailRef.current.value 
      })

      if (response.status === 400) {
        alert("인증번호가 일치하지 않습니다.")
        // setBackendMeesage("인증번호가 일치하지 않습니다.")
      } 
      else if (response.status === 409) {
        alert("이미 가입된 이메일이 존재합니다.")
        // setBackendMeesage("이미 가입된 이메일이 존재합니다.")
      }
      else if (response.status === 200) {
        setIsBackendRequest(true)
        setTimer(900)
      }
      
      setIsSending(false)
    }

      // if (!response.success) {
      //   throw new Error(response.message || "요청 실패")
      // }

      // setIsEmailCodeSent(true)
      // setEmailCodeMessage("")
      // setTimer(900)

      // console.log(`인증 코드가 전송되었습니다.`)
      // console.log(response)
    // } catch (err) {
      // console.error("이메일 인증 코드 전송 오류:", err.message)
      // setEmailCodeMessage("인증 코드 전송 실패: " + err.message)
    // } finally {
      // setIsSending(false)
    //}

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

  // return { handleSendEmailCode, isEmailCodeSent, emailCodeMessage, timer, formatTime, isSending }
  return { requestPostEmailCode, isSending, isEmailSent, timer, formatTime, isValidateEmail }
}

export default useSendEmailCode