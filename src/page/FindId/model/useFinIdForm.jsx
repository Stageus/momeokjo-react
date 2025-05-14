import { useState } from "react"
import { regex } from "../../../shared/Content/regex"
import useFetch from "../../../entities/model/useFetch"
import useValidatorInput from "../../../shared/model/useValidatorInput"

const useFindIdForm = (emailRef) => {


  const postData = useFetch()
  const [isValidateEmail, setIsValidateEmail] = useState(true)
  const [isFindIdSuccess, setIsFindIdSuccess] = useState(false)
  const [foundId, setFoundId] = useState('')

  // 아이디 찾기 이벤트
  const requestPostFindId = async () => {

    const validateEmailResult = useValidatorInput(emailRef, regex.email)
    setIsValidateEmail(validateEmailResult)

    if (validateEmailResult) {
      const response = await postData("POST", "/auth/findid", {
        email: emailRef?.current?.value,
      })
      console.log(response); // 응답 확인
      if (response.status === 400) {
        alert("입력값의 양식이 올바르지 않습니다.")
      } else if (response.status === 404) {
        alert("등록된 계정이 없습니다.")
      } else if (response.status === 200) {
        const target = response?.data?.data?.id
          if (target) {
            setIsFindIdSuccess(true)
            setFoundId(target)
          } else {
            alert("아이디를 찾을 수 없습니다.")
          }
      }
    }

    
  }

  return {isFindIdSuccess, isValidateEmail, foundId, requestPostFindId}

}

export default useFindIdForm