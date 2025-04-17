import { useNavigate } from "react-router-dom"

const useChangePwForm = ( validatePassword, validateConfirmPassword ) => {
  const navigate = useNavigate()

  // 비밀번호 변경 이벤트
  const handleChangePw = (setErrors) => {
    const passwordError = validatePassword()
    const confirmPasswordError = validateConfirmPassword()
    const errors = {}

    if (passwordError) {
      errors.password = passwordError
      setErrors(errors)
    }
    if (confirmPasswordError) {
      errors.confirmPassword = confirmPasswordError
      setErrors(errors)
    }

    if (Object.keys(errors).length === 0) {
      alert("비밀번호 변경 성공")
      navigate('/login')
    }

  }

  return handleChangePw

}

export default useChangePwForm