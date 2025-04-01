import { useState, useCallback, useRef } from "react"
import { regex, messages } from "../../../shared/Content/regex"

const useFindIdForm = () => {
  const values = useRef({
    email: '',
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 아이디 찾기
  const [isFindIdSuccess, setIsFindIdSuccess] = useState(false)
  const [foundId, setFoundId] = useState('')

  // 비밀번호 변경 필드 정보
  const findIdInputFields = [
    { label: "이메일", type: "email", name: "email", placeholder: "이메일을 입력해주세요" }
  ]

  // 아이디 찾기 이벤트
  const handleFindId = useCallback(async () => {
    const {email} = values.current
    const newErrors = {}

    if (!regex.email.test(email)) {
      newErrors.email = messages.email
    } else {
      // 가입된 회원 확인 (로컬 스토리지 사용)
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const user = storedUsers.find(user => user.email === email)

      if (!user) {
        newErrors.email = messages.emailCode
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** 임시 프론트엔드 테스트용 **
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const user = storedUsers.find(user => user.email === email)

    setFoundId(user.id)

    setIsFindIdSuccess(true)
  })

  return {errors, values, handleFindId, findIdInputFields, isFindIdSuccess, foundId}

}

export default useFindIdForm