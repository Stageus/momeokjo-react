import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regex } from "../../../shared/Content/regex";
import useFetch from "../../../entities/model/useFetch";
import useValidatorInput from '../../../shared/model/useValidatorInput'

const useOauthSignupForm = (nicknameRef, isEmailSuccessful) => {
  
  const navigate = useNavigate()
  const postData = useFetch()
  const [isValidateNickname, setIsValidateNickname] = useState(true)

  const requestPostOauthSignup = async () => {

    if (!isEmailSuccessful) {
      alert("이메일 인증을 먼저 해주세요.")
      return
    }

    const validateNicknameResult = useValidatorInput(nicknameRef, regex.nickname)
    setIsValidateNickname(validateNicknameResult)

    if (validateNicknameResult) {
      const response = await postData("POST", "/auth/oauth/signup", {
        nickname: nicknameRef?.current?.value,
      })

      if (response.status === 400) {
        alert("입력값의 양식이 올바르지 않습니다.")
      }
      if (response.status === 409) {
        const target = response?.data?.target
        alert(`${target}의 값이 중복됩니다.`)
      }
      else if (response.status === 200) {
        alert("회원가입에 성공하였습니다.")
        navigate("/login")
      }
    }
  }

  return {requestPostOauthSignup, isValidateNickname}
}

export default useOauthSignupForm