import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regex } from '../../../shared/Content/regex'
import useFetch from "../../../entities/model/useFetch";
import useValidatorInput from "../../../shared/model/useValidatorInput";

const useChangePwForm = (passwordRef, confirmPasswordRef) => {

  const navigate = useNavigate()
  
  const putData = useFetch()
  const [isValidatePassword, setIsValidatePassword] = useState(true)
  const [isComparePassword, setIsComparePassword] = useState(true)

  const requestPutChangePw = async () => {
    
    const validatePwResult = useValidatorInput(passwordRef, regex.password)
    setIsValidatePassword(validatePwResult)


    const comparePwResult = passwordRef?.current?.value === confirmPasswordRef?.current?.value ? true : false
    setIsComparePassword(comparePwResult)

    if (validatePwResult && comparePwResult) {

      const response = await putData("PUT", "/auth/resetpw", {
        pw: passwordRef?.current?.value,
      }) 

      if (response.status === 400) {
        alert("입력값의 양식이 올바르지 않습니다.")
      }
      else if (response.status === 404) {
        alert("해당하는 사용자 없습니다.")
      }
      else if (response.status === 200) {
        alert("비밀번호 변경에 성공하였습니다.")
        navigate("/login")
      }
    }

  }

  return {requestPutChangePw, isValidatePassword, isComparePassword}

}

export default useChangePwForm