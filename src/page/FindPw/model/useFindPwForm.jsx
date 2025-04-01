import { useState, useCallback } from "react"

const useFindPwForm = () => {

  const [values, setValues] = useState({
    id: '',
    email: '',
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 비밀번호 변경
  const [isFindPwSuccess, setIsFindPwSuccess] = useState(false)

  // 정규표현식
  const regex = {
    id: /^[a-zA-Z0-9]{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }

  // 유효성 검사 메시지
  const messages = {
    id: "50자 이하 / 한글, 영어, 숫자 포함",
    email: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태",
    noAccount: "가입된 회원이 아닙니다.",
  }

  // 비밀번호 변경 필드 정보
  const findPwInputFields = [
    { label: "아이디", type: "text", name: "id"},
    { label: "이메일", type: "email", name: "email"}
  ]

  // 필드 값 변경
  const handleChange = useCallback((e) => {
    const {name, value} = e.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }, [])

  // 비밀번호 찾기 이벤트
  const handleFindPw = useCallback(async () => {
    const {id, email} = values
    const newErrors = {}

    if (!regex.id.test(id)) {
      newErrors.id = messages.id
    }

    if (!regex.email.test(email)) {
      newErrors.email = messages.email
    } else {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const user = storedUsers.find(user => user.id === id && user.email === email)

      if (!user) {
        newErrors.id = messages.noAccount
        newErrors.email = messages.noAccount
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

   
    setIsFindPwSuccess(true)
  }, [values, regex, messages])

  return {errors, values, handleChange, handleFindPw, findPwInputFields, isFindPwSuccess, setIsFindPwSuccess}

}

export default useFindPwForm