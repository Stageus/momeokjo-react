import { useState, useCallback } from "react"

const useFindIdForm = (navigate) => {

  const [value, setValue] = useState({
    email: '',
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 아이디 찾기
  const [isFindIdSuccess, setIsFindIdSuccess] = useState(false)
  const [foundId, setFoundId] = useState('')

  // 정규표현식
  const regex = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  }

  // 유효성 검사 메시지
  const messages = {
    email: "254자 이하 / '영어, 숫자, 특수문자(. , +, -, _ 만 허용) + @ + 도메인' 형태",
    noAccount: "가입된 회원이 아닙니다.",
  }

  // 비밀번호 변경 필드 정보
  const findIdInputFields = [
    { label: "이메일", type: "email", name: "email", placeholder: "이메일을 입력해주세요" }
  ]

  // 필드 값 변경
  const handleChange = useCallback((e) => {
    const {name, value} = e.target
    setValue(prevvalue => ({ ...prevvalue, [name]: value }))
  }, [])

  // 아이디 찾기 이벤트
  const handleFindId = useCallback(async () => {
    const {email} = value
    const newErrors = {}

    if (!regex.email.test(email)) {
      newErrors.email = messages.email
    } else {
      // 가입된 회원 확인 (로컬 스토리지 사용)
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const user = storedUsers.find(user => user.email === email)

      if (!user) {
        newErrors.email = messages.noAccount
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
  }, [value, regex, messages])

  return {errors, value, handleChange, handleFindId, findIdInputFields, isFindIdSuccess, setIsFindIdSuccess, foundId}

}

export default useFindIdForm