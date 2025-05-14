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

    if (!isEmailSuccessful) {
      alert("이메일 인증을 먼저 해주세요.")
      return
    }

    const validateIdResult = useValidatorInput(idRef, regex.id)
    setIsValidateId(validateIdResult)


    const validatePwResult = useValidatorInput(passwordRef, regex.password)
    setIsValidatePassword(validatePwResult)


    const comparePwResult = passwordRef?.current?.value === confirmPasswordRef?.current?.value ? true : false
    setIsComparePassword(comparePwResult)


    const validateNicknameResult = useValidatorInput(nicknameRef, regex.nickname)
    setIsValidateNickname(validateNicknameResult)


      if (validateIdResult && validatePwResult && validateNicknameResult && isComparePassword) {

        const response = await postData("POST", "/auth/signup", {
          id: idRef?.current?.value,
          pw: passwordRef?.current?.value,
          nickname: nicknameRef?.current?.value,
        })

        if (response.status === 400) {
          alert("입력값의 양식이 올바르지 않습니다.")
        }
        else if (response.status === 409) {
          const target = response?.data?.target
          alert(`${target}의 값이 중복됩니다.`)
        }
        else if (response.status === 200) {
          alert("회원가입에 성공하였습니다.")
          navigate("/login")
        }

      }

    }

    return {requestPostSignup, isValidateId, isValidatePassword, isValidateNickname, isComparePassword}

}

export default useSignUpForm;