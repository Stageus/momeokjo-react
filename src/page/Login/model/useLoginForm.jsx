import { useNavigate } from 'react-router-dom';

const useLoginForm = (validateId, validatePassword) => {
  const navigate = useNavigate()

  // 로그인 처리 함수
  const handleLogin = (setErrors) => {
    const idError = validateId()
    const passwordError = validatePassword()

    const errors = {}

    if (idError) {
      errors.id = idError
      setErrors(errors)
    }
    if (passwordError) {
      errors.password = passwordError
      setErrors(errors)
    }

    if (Object.keys(errors).length === 0) {
      alert("로그인 성공")
      navigate('/')
    }
  }

  return handleLogin
}

export default useLoginForm
