import { useState } from "react"
import { messages } from "../../../shared/Content/regex"

const useConfirmEmailCode = (validateEmailCode) => {
  const [isEmailSuccessful, setIsEmailSuccessful] = useState(false)
  const [emailCodeMessage, setEmailCodeMessage] = useState("")
  
  // 이메일 인증 확인
  const confirmEmailCode = (setErrors) => {
    const validationResult = validateEmailCode()

    if (!validationResult) {
      setIsEmailSuccessful(true)
      setEmailCodeMessage("인증에 성공하였습니다.")
      setErrors(prev => ({ ...prev, emailCode: "" }))
    } else {
      setIsEmailSuccessful(false)
      setEmailCodeMessage("")
      setErrors(prev => ({ ...prev, emailCode: validationResult }))
    }
  }

    return { confirmEmailCode, isEmailSuccessful, emailCodeMessage }

}


export default useConfirmEmailCode