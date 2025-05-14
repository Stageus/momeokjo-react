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

  const requestPostLogin = async () => {
    console.log(idRef?.current?.value, passwordRef?.current?.value)

    const validateIdResult = useValidatorInput(idRef, regex.id)
    setIsValidateId(validateIdResult)

    const validatePwResult = useValidatorInput(passwordRef, regex.password)
    setIsValidatePassword(validatePwResult)

    if (validateIdResult && validatePwResult) {

      const response = await fetchData("POST", "/auth/signin", {
        id: idRef?.current?.value,
        pw: passwordRef?.current?.value,
      })

      if (response?.status === 400) {
        alert("입력값의 양식이 올바르지 않습니다.")
      }
      else if (response?.status === 404) {
        alert("등록된 계정이 없습니다.")
      }
      else if (response?.status === 200) {
        console.log("로그인 응답 데이터:", response.data)

        try {
          const statusResponse = await fetchData(
              'GET',
              '/auth/status',
              null,
              null,
              { skipRedirect: true },
              { withCredentials: true }
          )

          console.log("로그인 성공 후 status 응답 받음:", statusResponse)

          if (statusResponse?.status === 200) {
            const userDataFormStatus = statusResponse.data?.data

            console.log("status API에서 가져온 사용자 데이터:", userDataFormStatus)

            if (userDataFormStatus && userDataFormStatus.users_idx) {
              setAuth({
                isLoggedIn: true,
                user: userDataFormStatus,
                checked: true,
              })
              console.log("로그인 성공 후 authState 최종 업데이트 됨:", {
                isLoggedIn: true, user: userDataFormStatus, checked: true
              })
              alert("로그인에 성공하였습니다.")
              navigate("/")
            } else {
                console.error("status API에서 사용자 정보를 가져오는데 실패했습니다.")
                setAuth({
                    isLoggedIn: false,
                    user: null,
                    checked: true,
                })
                alert("로그인 성공 후 사용자 정보 로딩에 실패했습니다. 다시 시도해주세요.")
              } 
            } else {
              console.error("로그인 성공 후 status API 호출 실패:", statusResponse)
               setAuth({
                  isLoggedIn: false,
                  user: null,
                  checked: true,
              })
              alert("로그인 성공 후 사용자 정보 로딩 중 오류가 발생했습니다. 다시 시도해주세요.")
            }
        } catch (statusError) {
          console.error("로그인 성공 후 status API 호출 중 에러 발생:", statusError)
             setAuth({
                isLoggedIn: false,
                user: null,
                checked: true,
            })
            alert("로그인 성공 후 사용자 정보 로딩 중 심각한 오류가 발생했습니다. 다시 시도해주세요.")
        }
      }
    }
  }

  return { requestPostLogin, isValidateId, isValidatePassword }
}

export default useLoginForm
