import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regex } from '../../../shared/Content/regex'
import useFetch from '../../../entities/model/useFetch';
import useValidatorInput from "../../../shared/model/useValidatorInput";

const useSignUpForm = (
  idRef,
  passwordRef,
  confirmPasswordRef,
  nicknameRef,
  isEmailSuccessful
) => {
  
  const navigate = useNavigate()

  const postData = useFetch()
  const [isValidateId, setIsValidateId] = useState(true)
  const [isValidatePassword, setIsValidatePassword] = useState(true)
  const [isComparePassword, setIsComparePassword] = useState(true)
  const [isValidateNickname, setIsValidateNickname] = useState(true)

  const requestPostSignup = async () => {
    const id = idRef?.current?.value
    const pw = passwordRef?.current?.value
    const nickname = nicknameRef?.current?.value
    

    const validateIdResult = useValidatorInput(idRef, regex.id)
    const validatePwResult = useValidatorInput(passwordRef, regex.password)
    const comparePwResult = passwordRef?.current?.value === confirmPasswordRef?.current?.value ? true : false
    const validateNicknameResult = useValidatorInput(nicknameRef, regex.nickname)

    setIsValidateId(validateIdResult)
    setIsValidatePassword(validatePwResult)
    setIsComparePassword(comparePwResult)
    setIsValidateNickname(validateNicknameResult)

    


    if (validateIdResult && validatePwResult && validateNicknameResult && isComparePassword) {

      if (!isEmailSuccessful) {
        alert("이메일 인증을 먼저 해주세요.")
        return
      }

      const response = await postData("POST", "/auth/signup", { id, pw, nickname })

      switch (response?.status) {
        case 400:
          alert("입력값의 양식이 올바르지 않습니다.")
          return
        case 409:
          const target = response?.data?.target
          alert(`${target}의 값이 중복됩니다.`)
          return
        case 200:
          alert("회원강비에 성공하였습니다.")
          navigate("/login")
      }
    }
  }

  return {requestPostSignup, isValidateId, isValidatePassword, isValidateNickname, isComparePassword}
}

export default useSignUpForm;