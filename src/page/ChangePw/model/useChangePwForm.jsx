import { useState, useCallback } from "react"

const useChangePwForm = (navigate) => {

  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  })

  // 에러 상태 관리
  const [errors, setErrors] = useState({})
  // 비밀번호 변경
  const [isChangePwSuccess, setIsChangePwSuccess] = useState(false)
  // 정규표현식
  const regex = {
    password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9]).{8,32}$/,
  }

  // 유효성 검사 메시지
  const messages = {
    password: "8~32자 이하, 영대문자 1자 이상, 특수문자 1자이상, 영소문자, 숫자 조합",
    confirmPassword: "비밀번호 입력값과 동일한 번호를 입력해주세요",
  }

  // 비밀번호 변경 필드 정보
  const changePwInputFields = [
    { label: "비밀번호", type: "password", name: "password" },
    { label: "비밀번호 확인", type: "password", name: "confirmPassword"},
  ]

  // 필드 값 변경
  const handleChange = useCallback((e) => {
    const {name, value} = e.target
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }, [])

  // 비밀번호 변경 이벤트
  const handleChangePw = useCallback(async () => {
    const {password, confirmPassword} = values
    const newErrors = {}

    // 유효성 검사
    if (!regex.password.test(password)) {
      newErrors.password = messages.password
    }
    if (password !== confirmPassword || !confirmPassword) {
      newErrors.confirmPassword = messages.confirmPassword
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // ** 기존 비밀번호와 같은지 확인하는 로직 추가 **
    const storedUsers = JSON.parse(localStorage.getItem("users") || JSON.stringify([]))
    const userId = localStorage.getItem("userId")

    if (!userId) {
      console.error("User ID not found in localStorage")
      alert("로그인이 필요합니다.")
      navigate("/login")
      return;
    }

    const userIndex = storedUsers.findIndex(user => user.id === userId)

    if (userIndex === -1) {
      console.error("User not found in storedUsers")
      return 
    }

    const user = storedUsers[userIndex]

    if (user && user.password === password) {
      setErrors({ password: "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다." })
      return
    }

    // ** 사용자 비밀번호 업데이트 (불변성 유지) **
    const newStoredUsers = [...storedUsers] // 배열 복사
    newStoredUsers[userIndex] = { ...user, password: password } // 객체 복사 후 password 변경

    // 로컬 스토리지 업데이트
    localStorage.setItem("users", JSON.stringify(newStoredUsers))

    setIsChangePwSuccess(true)
  }, [values, navigate, regex, messages])

  return {errors, values, handleChange, handleChangePw, changePwInputFields, isChangePwSuccess, setIsChangePwSuccess}

}

export default useChangePwForm