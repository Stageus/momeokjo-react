import { useNavigate } from "react-router-dom"

const useFindPwForm = (validateId, validateEmail) => {
  const navigate = useNavigate()

  // 비밀번호 찾기 이벤트
  const handleFindPw = (setErrors) => {
    const idError = validateId()
    const emailError = validateEmail()
    const errors = {}

    if (idError) {
      errors.id = idError
      setErrors(errors)
    }
    if (emailError) {
      errors.email = emailError
      setErrors(errors)
    }

    if (Object.keys(errors).length === 0) {
      alert("비밀번호 변경페이지로 이동합니다.")
      navigate('/change-pw')
    }

  }

  return handleFindPw
  
}

export default useFindPwForm