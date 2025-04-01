import { useState, useCallback, useRef } from "react"
import { IdRegex, IdMessage, EmailRegex, EmailMessage, NoAccountMessage } from "../../../shared/Content/regex"

const useFindPwForm = () => {

  const values = useRef({
    id: '',
    email: '',
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 회원 확인 여부
  const [isFindPwSuccess, setIsFindPwSuccess] = useState(false)

  // 비밀번호 변경 필드 정보
  const findPwInputFields = [
    { label: "아이디", type: "text", name: "id"},
    { label: "이메일", type: "email", name: "email"}
  ]

  // 비밀번호 찾기 이벤트
  const handleFindPw = useCallback(async () => {
    const {id, email} = values.current
    const newErrors = {}

    if (!IdRegex.test(id)) {
      newErrors.id = IdMessage
    }

    if (!EmailRegex.test(email)) {
      newErrors.email = EmailMessage
    } else {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const user = storedUsers.find(user => user.id === id && user.email === email)

      if (!user) {
        newErrors.id = NoAccountMessage
        newErrors.email = NoAccountMessage
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

   
    setIsFindPwSuccess(true)
  }, [values])

  return {errors, values, handleFindPw, findPwInputFields, isFindPwSuccess}

}

export default useFindPwForm