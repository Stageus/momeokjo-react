import { useState } from "react"
import useFetch from "../../../entities/model/usePost"
import useValidatorInput from "../../../shared/model/useValidatorInput"
import { regex } from "../../../shared/Content/regex"

const useConfirmEmailCode = () => {
  const [isEmailSuccessful, setIsEmailSuccessful] = useState(false)
  const postData = useFetch()
  

  const requestPostEmailConfirm = async (emailCodeRef) => {
    
    const isValidateEmailCode = useValidatorInput(emailCodeRef, regex.emailCode)

    if (!isValidateEmailCode) {

      const response = await postData("POST", "/auth/verify-email/confirm", {
        code: Number(emailCodeRef?.current?.value)
      })

      if (response.status === 400) {
        alert("인증번호 형식이 올바르지 않습니다.")
      }
      else if (response.status === 200) {
        setIsEmailSuccessful(true)
      }
    } 
  }

  return { requestPostEmailConfirm, isEmailSuccessful, isValidateEmailCode }
}


export default useConfirmEmailCode