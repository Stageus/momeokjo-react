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
  // const [errors, setErrors] = useState({})
  const [isValidateId, setIsValidateId] = useState(true)
  const [isValidatePassword, setIsValidatePassword] = useState(true)
  const [isComparePassword, setIsComparePassword] = useState(true)
  const [isValidateNickname, setIsValidateNickname] = useState(true)
  const navigate = useNavigate()

  const postData = useFetch()

  // const values = useRef({
  //   ...(pageType === 'local' && {
  //     id: idRef.current?.value || '',
  //     password: passwordRef.current?.value || '',
  //     confirmPassword: confirmPasswordRef.current?.value || '',
  //   }),
  //   nickname: nicknameRef.current?.value || '',
  //   email: emailRef.current?.value || '',
  //   emailCode: emailCodeRef.current?.value || '',
  // })

    // 회원가입 이벤트 부분
  const requestPostSignup = async () => {

    if (!isEmailSuccessful) {
      alert("이메일 인증을 먼저 해주세요.")
      return
    }

    console.log({
      id: idRef.current?.value,
      pw: passwordRef.current?.value,
      nickname: nicknameRef.current?.value,
    });

    const validateIdResult = useValidatorInput(idRef, regex.id)
    setIsValidateId(validateIdResult)
    const validatePasswordResult = useValidatorInput(passwordRef, regex.password)
    setIsValidatePassword(validatePasswordResult)
    const comparePassword = 
      passwordRef?.current?.value === confirmPasswordRef?.current?.value ? true : false
      setIsComparePassword(comparePassword)
    const validateNicknameResult = useValidatorInput(nicknameRef, regex.nickname)
    setIsValidateNickname(validateNicknameResult)

      // const newErrors = {}
      
      // if (pageType === 'local') {
      // const idError = validateId()
      // const passwordError = validatePassword()
      // const confirmPasswordError = validateConfirmPassword()

      // if (idError) newErrors.id = idError
      // if (passwordError) newErrors.password = passwordError
      // if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError
      // // }

      // const nicknameError = validateNickname()
      // const emailError = validateEmail()
      // const emailCodeError = validateEmailCode()

      // if (nicknameError) newErrors.nickname = nicknameError
      // if (emailError) newErrors.email = emailError

      // if (!emailError && !isEmailSuccessful) {
      //   newErrors.email = messages.emailVerification
      // }

      // if (Object.keys(newErrors).length > 0) {
      //   setErrors(newErrors)
      //   return
      // }

      // 최신 값을 갱신
      // values.current = {
      //   ...(pageType === 'local' && {
      //     id: idRef.current?.value,
      //     password: passwordRef.current?.value,
      //     confirmPassword: confirmPasswordRef.current?.value,
      //   }),
      //   nickname: nicknameRef.current?.value,
      //   email: emailRef.current?.value,
      //   emailCode: emailCodeRef.current?.value,
      // }

      if (isValidateId && isValidatePassword && isValidateNickname && isComparePassword) {

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

      // const signupUrl = pageType === "local" ? "/auth/signup" : "/auth/oauth/signup"

      // const requestBody = {
      //   ...(pageType === 'local' && {
      //     id: values.current.id,
      //     password: values.current.password,
      //   }),
      //   nickname: values.current.nickname,
      //   email: values.current.email,
      // }

      // const response = await postData(signupUrl, requestBody)

      // console.log("회원가입 응답:", response)

      // if (response?.success) {
      //   alert("회원가입 및 로그인 성공!")
      //   navigate("/", { replace: true})
      // } else {
      //   alert(`회원가입 실패: ${response?.message || "다시 시도해주세요."}`)
      // }

    }

    return {requestPostSignup, isValidateId, isValidatePassword, isValidateNickname, isComparePassword}

    // return {
    //   errors,
    //   values,
    //   handleSignUp,
    //   pageType,
    //   setErrors,
    // }
}

export default useSignUpForm;