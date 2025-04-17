import { useState, useRef} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { messages } from '../../../shared/Content/regex';

const useSignUpForm = (
  idRef,
  passwordRef,
  confirmPasswordRef,
  nicknameRef,
  emailRef,
  emailCodeRef,
  validateId, 
  validatePassword, 
  validateConfirmPassword, 
  validateNickname, 
  validateEmail, 
  validateEmailCode,
  isEmailSuccessful
) => {
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const pageType = searchParams.get("page") === "간편회원가입" ? "easy" : "local"

  const values = useRef({
    ...(pageType === 'local' && {
      id: idRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
    }),
    nickname: nicknameRef.current?.value || '',
    email: emailRef.current?.value || '',
    emailCode: emailCodeRef.current?.value || '',
  })

    // 회원가입 이벤트 부분
    const handleSignUp = () => {
      const newErrors = {}
      
      if (pageType === 'local') {
        const idError = validateId()
        const passwordError = validatePassword()
        const confirmPasswordError = validateConfirmPassword()

        if (idError) newErrors.id = idError
        if (passwordError) newErrors.password = passwordError
        if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError
      }

      const nicknameError = validateNickname()
      const emailError = validateEmail()
      const emailCodeError = validateEmailCode()

      if (nicknameError) newErrors.nickname = nicknameError;
      if (emailError) {
        newErrors.email = emailError
      }

      if (!emailError && !isEmailSuccessful) {
        newErrors.email = messages.emailVerification
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return
      }

      // 최신 값을 갱신
      values.current = {
        ...(pageType === 'local' && {
          id: idRef.current?.value,
          password: passwordRef.current?.value,
          confirmPassword: confirmPasswordRef.current?.value,
        }),
        nickname: nicknameRef.current?.value,
        email: emailRef.current?.value,
        emailCode: emailCodeRef.current?.value,
      }

      if (pageType === 'local' &&
          values.current.id &&
          values.current.password &&
          values.current.confirmPassword === values.current.password &&
          values.current.nickname &&
          values.current.email &&
          isEmailSuccessful) {
        alert("회원가입 및 로그인 성공!");
        navigate("/", { replace: true });
      }

      if (pageType === 'easy' &&
          values.current.nickname &&
          values.current.email &&
          isEmailSuccessful) {
        alert("간편 회원가입 및 로그인 성공!");
        navigate("/", { replace: true });
      }

    }

    return {
      errors,
      values,
      handleSignUp,
      pageType,
      setErrors,
    }
}

export default useSignUpForm;