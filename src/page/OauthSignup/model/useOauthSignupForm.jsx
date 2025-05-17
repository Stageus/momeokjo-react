import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { regex } from "../../../shared/Content/regex";
import useFetch from "../../../entities/model/useFetch";
import useValidatorInput from '../../../shared/model/useValidatorInput'
import { useSetRecoilState } from "recoil";
import { authState } from "../../../shared/model/atom";

const useOauthSignupForm = (nicknameRef, isEmailSuccessful) => {
  
  const navigate = useNavigate()
  const postData = useFetch()
  const setAuth = useSetRecoilState(authState)
  const [isValidateNickname, setIsValidateNickname] = useState(true)

  const requestPostOauthSignup = async () => {
    const nickname = nicknameRef?.current?.value
    
    const validateNicknameResult = useValidatorInput(nicknameRef, regex.nickname)
    setIsValidateNickname(validateNicknameResult)

    if (validateNicknameResult) {

      if (!isEmailSuccessful) {
        alert("이메일 인증을 먼저 해주세요.")
        return
      }

      const response = await postData("POST", "/auth/oauth/signup", { nickname })

      switch (response.status) {
        case 400:
          alert("입력값의 양식이 올바르지 않습니다.")
          return
        case 409:
          const target = response?.data?.target
          alert(`${target}의 값이 중복됩니다.`)
          return
        case 200:
          const userDataFormStatus = response.data?.data
          alert("회원가입에 성공하였습니다.")

          setAuth({
            isLoggedIn: true,
            user: userDataFormStatus,
            checked: true,
          })

          navigate("/")
      }
    }
  }

  return {requestPostOauthSignup, isValidateNickname}
}

export default useOauthSignupForm