import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regex } from '../../../shared/Content/regex';
import useFetch from '../../../entities/model/useFetch';
import useValidatorInput from "../../../shared/model/useValidatorInput"
import { useSetRecoilState } from 'recoil';
import { authState } from '../../../shared/model/atom';

const useLoginForm = (idRef, passwordRef) => {

  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authState)
  const fetchData = useFetch()

  const [isValidateId, setIsValidateId] = useState(true)
  const [isValidatePassword, setIsValidatePassword] = useState(true)

  const handleAuthError = (message) => {
    setAuth({ isLoggedIn: false, user: null, checked: true })
    alert(message)
  }

  const requestPostLogin = async () => {
    const id = idRef?.current?.value
    const pw = passwordRef?.current?.value

    const validateIdResult = useValidatorInput(idRef, regex.id)
    const validatePwResult = useValidatorInput(passwordRef, regex.password)

    setIsValidateId(validateIdResult)
    setIsValidatePassword(validatePwResult)

    if (!validateIdResult || !validatePwResult) return

    const response = await fetchData("POST", "/auth/signin", { id, pw })

    switch (response?.status) {
      case 400:
        alert("입력값의 양식이 올바르지 않습니다.")
        return
      case 404:
        alert("등록된 계정이 없습니다.")
        return
      case 200:
        break
      default:
        return
    }

    try {
      const statusResponse = await fetchData("GET", "/auth/status", null, null, { skipRedirect: true })

      const userData = statusResponse?.data?.data

      if (statusResponse.status === 200) {
        setAuth({ 
          isLoggedIn: true, 
          user: userData, 
          checked: true 
        })
        alert("로그인에 성공하였습니다.")
        navigate("/")
      } else {
        handleAuthError("사용자 정보 로딩 실패")
      }
    } catch (err) {
      console.error("status API 에러:", err)
      handleAuthError("사용자 정보 확인 중 오류 발생")
    }
  }

  return { requestPostLogin, isValidateId, isValidatePassword }
}

export default useLoginForm
