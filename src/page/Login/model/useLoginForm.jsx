import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { regex, messages } from '../../../shared/Content/regex';

const useLoginForm = () => {

  const navigate = useNavigate()
  const values = useRef({
    id: '',
    password: '',
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})

  // 로그인 필드 정보
  const loginInputFields = [
    { label: "아이디", type: "text", name: "id", placeholder: "아이디를 입력하세요" },
    { label: "비밀번호", type: "password", name: "password", placeholder: "비밀번호를 입력하세요" },
  ]

  // 로그인 처리 함수
  const handleLogin = useCallback(async () => {
    const { id, password } = values.current
    const newErrors = {}

    if (!regex.id.test(id)) {
      newErrors.id = messages.id
    }
    if (!regex.password.test(password)) {
      newErrors.password = messages.password
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** 프론트엔드에서 사용자 정보 확인 **
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const user = storedUsers.find(user => user.id === id)

    // ** 임시 프론트엔드 테스트용 **
    if (user) {
      if (user.password === password) {
        alert("로그인 성공 (임시)")
        localStorage.setItem("userId", user.id)
        navigate("/")
      } else {
        alert("로그인 실패 (임시): 아이디 또는 비밀번호가 일치하지 않습니다.")
        values(prevValues => ({
          ...prevValues,
          id: '',
          password: ''
        }))
      }
    } else {
      alert("로그인 실패: 존재하지 않는 아이디입니다.")
      values(prevValues => ({
        ...prevValues,
        id: '',
        password: ''
      }))
    }
  }, [values, navigate])

  return {errors, values, handleLogin, loginInputFields}
}

export default useLoginForm
