import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { regex } from "../../../shared/Content/regex"
import useFetch from "../../../entities/model/useFetch"
import useValidatorInput from "../../../shared/model/useValidatorInput"

const useFindPwForm = (idRef, emailRef) => {

  const navigate = useNavigate()

  const postData = useFetch()
  const [isValidateId, setIsValidateId] = useState(true)
  const [isValidateEmail, setIsValidateEmail] = useState(true)

  const requestPostFindPw = async () => {
    
    const validateIdResult = useValidatorInput(idRef, regex.id)
    setIsValidateId(validateIdResult)

    const validateEmailResult = useValidatorInput(emailRef, regex.email)
    setIsValidateEmail(validateEmailResult)

    if (validateIdResult && validateEmailResult) {

      const response = await postData("POST", "/auth/findpw", {
        id: idRef?.current?.value,
        email: emailRef?.current?.value,
      })

      if (response.status === 400) {
        alert("입력값의 양식이 올바르지 않습니다.")
      }
      else if (response.status === 404) {
        alert("등록된 계정이 없습니다.")
      }
      else if (response.status === 200) {
        alert("비밀번호 변경 페이지로 이동합니다.")
        navigate("/change-pw")
      }
    }

  }

  return { requestPostFindPw, isValidateId, isValidateEmail }
  
}

export default useFindPwForm