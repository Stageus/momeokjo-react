import { useNavigate } from 'react-router-dom';

const useLoginForm = (validateId, validatePassword) => {
  const navigate = useNavigate()

  // 로그인 처리 함수
  const handleLogin = async (setErrors, id, password) => {
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

      const response = await fetch('http://39.123.217.25:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password}),
      })

      if (response.ok) {
        alert("로그인 성공")
        navigate('/')
      } else {
        const error = await response.json()
        setErrors({ login: error.message })
      }
      
    }
  }

  return handleLogin
}

export default useLoginForm
